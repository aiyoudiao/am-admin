/*
 * @Description: Auth Service
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

import { AmInternational } from '@/models/am_international.model'; // am_international 实体
import { AmJobs } from '@/models/am_jobs.model'; // am_jobs 实体
import { AmMenu } from '@/models/am_menu.model'; // am_menu 实体
import { AmOrganization } from '@/models/am_organization.model'; // am_organization 实体
import { AmRole } from '@/models/am_role.model'; // am_role 实体
import { AmUser } from '@/models/am_user.model'; // am_user 实体
import { initializeTree, responseMessage } from '@/utils';
import type { Response, SessionTypes } from '@/utils/types';

import { LoginParamsDto } from './dto';

type responseResult = Response<Record<string, any>>;

@Injectable()
export class AuthService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(AmUser)
    private readonly userModel: typeof AmUser,
    @InjectModel(AmMenu)
    private readonly menuModel: typeof AmMenu,
    private readonly jwtService: JwtService,
    private sequelize: Sequelize,
  ) {}

  /**
   * @description: 用户登录
   */
  async loginSingToken(
    loginParams: LoginParamsDto,
    clinetIp: string,
    session: SessionTypes,
  ): Promise<responseResult> {
    // 登录参数校验结果
    const authResult: responseResult = await this.validateUser(
      loginParams,
      session,
    );
    // 解构参数
    const { data: userInfo, code } = authResult;
    // 状态码 code === 200,则登录成功
    switch (code) {
      case 200:
        // 生成 token
        const token = this.jwtService.sign({
          user_name: userInfo.user_name,
          user_id: userInfo.user_id,
        });
        // 登录成功后执行当前用户的更新操作
        const where: WhereOptions = { user_id: userInfo.user_id };
        const params = {
          token,
          login_last_ip: clinetIp,
          login_last_time: new Date(),
        };
        // 执行更新操作
        await this.userModel.update(params, { where });
        // 将登录次数+1
        await this.userModel.increment({ login_num: 1 }, { where });
        // 将数据保存到session
        const currentUserInfo = await this.userModel.findOne({
          attributes: {
            include: ['j.jobs_name', 'o.org_name', 'r.role_name'],
          },
          // 联表查询
          include: [
            {
              model: AmJobs,
              as: 'j',
              attributes: [],
            },
            {
              model: AmOrganization,
              as: 'o',
              attributes: [],
            },
            {
              model: AmRole,
              as: 'r',
              attributes: [],
            },
          ],
          raw: true,
          where,
        });
        session.currentUserInfo = currentUserInfo;
        return {
          data: {
            access_token: token,
            login_last_time: userInfo.login_last_time,
          },
        };
      // 其它情况直接返回结果
      default:
        return authResult;
    }
  }

  /**
   * @description: 校验用户信息
   * @param {LoginParamsDto} loginParams
   */
  async validateUser(
    loginParams: LoginParamsDto,
    session: SessionTypes,
  ): Promise<responseResult> {
    // 解构参数
    const { type, user_name, password, phone, verifyCode } = loginParams;
    // 判断参数是否正确
    if (!type) {
      return responseMessage({}, '参数不正确!', -1);
    }
    // 判断是否是用户登录，否则是手机登录
    const isAccount = type === 'account';
    // 查询条件
    const where: WhereOptions = isAccount ? { user_name } : { phone };
    // 查找用户
    const userInfo = await this.userModel.findOne({ where });
    // 根据登录类型执行不同的处理
    switch (type) {
      // 用户名登录
      case 'account':
        // 根据用户信息不同，返回相应的信息
        if (session.verifyCode.toUpperCase() !== verifyCode.toUpperCase()) {
          return responseMessage({}, '验证码不正确!', -1);
        } else if (!userInfo) {
          return responseMessage({}, '用户不存在!', -1);
        } else if (userInfo.password !== password) {
          return responseMessage({}, '密码不正确!', -1);
        } else if (!userInfo.status) {
          return responseMessage({}, '当前用户已被禁用,请联系管理员!', -1);
        }
      // 手机登录
      case 'mobile':
        if (!userInfo) {
          return responseMessage({}, '手机号码不存在!', -1);
        }
    }
    return responseMessage(userInfo, '登录成功!');
  }

  /**
   * @description: 用户退出当前登录
   */
  async logout(session: SessionTypes): Promise<responseResult> {
    const { currentUserInfo } = session;
    if (currentUserInfo) {
      const { user_id } = currentUserInfo;
      // 清空数据库中 token
      await this.userModel.update(
        { token: '' },
        {
          where: { user_id },
        },
      );
      return responseMessage({});
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }

  /**
   * @description: 获取用户按钮权限
   */
  async getPermissions(session: SessionTypes): Promise<Response<string[]>> {
    // 获取当前用户 id
    const { currentUserInfo } = session;
    if (currentUserInfo?.user_id) {
      const { user_id } = currentUserInfo;
      // 查询权限菜单
      const sqlData = await this.menuModel.findAll({
        attributes: ['permission'],
        where: {
          menu_id: {
            [Op.in]: this.sequelize.literal(`(select menu_id from am_permission
            where  FIND_IN_SET(role_id,(select role_id from am_user where user_id='${user_id}')))`),
          },
        },
      });
      // 获取按钮权限集合
      const permissions = sqlData.map((s) => s.permission);
      return responseMessage(permissions);
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }

  /**
   * @description: 获取用户权限菜单
   */
  async getRoutesMenus(session: SessionTypes): Promise<Response<AmMenu[]>> {
    // 获取当前用户 id
    const { currentUserInfo } = session;
    if (currentUserInfo?.user_id) {
      const { user_id } = currentUserInfo;
      // 查询权限菜单
      const sqlData = await this.menuModel.findAll({
        attributes: {
          exclude: ['name'],
          include: [[this.sequelize.literal('`i`.`name`'), 'name']],
        },
        // 联表查询
        include: [
          {
            model: AmInternational,
            as: 'i',
            attributes: [],
          },
        ],
        where: {
          menu_type: {
            [Op.ne]: 'button',
          },
          status: {
            [Op.ne]: '0',
          },
          menu_id: {
            [Op.in]: this.sequelize.literal(`(select menu_id from am_permission
            where  FIND_IN_SET(role_id,(select role_id from am_user where user_id='${user_id}')))`),
          },
        },
        order: [['sort', 'desc']], // 排序规则,
      });
      // 将数据转成树形结构
      const routes = initializeTree(sqlData, 'menu_id', 'parent_id', 'routes');
      return responseMessage(routes);
    }
    return responseMessage({}, '登录信息已失效!', 401);
  }
}
