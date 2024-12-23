/*
 * @Description: MenuManagement Service
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

import { AmInternational } from '@/models/am_international.model'; // am_international 实体
import { AmMenu } from '@/models/am_menu.model'; // am_menu 实体
import { AmUser } from '@/models/am_user.model'; // am_user 实体
import { initializeTree, responseMessage } from '@/utils'; // 全局工具函数
import type { Response, SessionTypes } from '@/utils/types';

import { ListMenuManagementDto, SaveMenuManagementDto } from './dto';

@Injectable()
export class MenuManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(AmMenu)
    private readonly menuModel: typeof AmMenu,
    @InjectModel(AmInternational)
    private readonly internationaModel: typeof AmInternational,
    private sequelize: Sequelize,
  ) {}

  /**
   * @description: 获取菜单列表
   */
  async getMenuList(
    menuInfo: ListMenuManagementDto,
  ): Promise<Response<AmMenu[]>> {
    // 解构参数
    const { menu_type, status, isPremission, start_time, end_time } = menuInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (menu_type) where.menu_type = { [Op.eq]: menu_type };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 如果是查询菜单权限的，过滤掉重定向有值的数据
    if (isPremission) {
      where.redirect = { [Op.is]: null };
      where.status = { [Op.ne]: '0' };
    }
    // 查询数据
    const sqlData = await this.menuModel.findAll({
      attributes: {
        include: [
          [this.sequelize.col('u.cn_name'), 'founder_name'],
          'i.zh-CN',
          'i.en-US',
          'i.ja-JP',
          'i.zh-TW',
        ],
      },
      // 联表查询
      include: [
        {
          model: AmUser,
          as: 'u',
          attributes: [],
        },
        {
          model: AmInternational,
          as: 'i',
          attributes: [],
        },
      ],
      raw: true,
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    // 将数据转成树形结构
    const result = initializeTree(sqlData, 'menu_id', 'parent_id', 'children');
    return responseMessage(result);
  }

  /**
   * @description: 创建菜单数据
   */
  async createMenu(
    menuInfo: SaveMenuManagementDto,
    session: SessionTypes,
  ): Promise<Response<SaveMenuManagementDto>> {
    // 解构参数
    const { menu_type, parent_id, permission } = menuInfo;

    // 按钮不能处于顶级
    if (menu_type === 'button' && !parent_id) {
      return responseMessage({}, '按钮不能处于顶级，只能是叶子结点!', -1);
    }
    // 权限标识是唯一的
    if (permission) {
      // 判断权限标识是否存在
      const where: WhereOptions = {};
      where.permission = {
        [Op.eq]: permission,
        [Op.not]: null,
      };
      // 如果有结果，则证明已存在
      const exist = await this.menuModel.findOne({ where });
      if (exist) {
        return responseMessage({}, '权限标识已存在!', -1);
      }
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.menuModel.create({
      ...menuInfo,
      founder: session.currentUserInfo.user_id,
    });
    return responseMessage(result);
  }

  /**
   * @description: 更新菜单数据
   */
  async updateMenu(
    menu_id: string,
    menuInfo: SaveMenuManagementDto,
  ): Promise<Response<number[]>> {
    // 解构参数
    const { menu_type, parent_id, permission } = menuInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === menu_id) {
      return responseMessage({}, '父级不能和自己相同!', -1);
    }

    // 按钮不能处于顶级
    if (menu_type === 'button' && !parent_id) {
      return responseMessage({}, '按钮不能处于顶级，只能是叶子结点!', -1);
    }
    // 权限标识是唯一的
    if (permission) {
      // 判断权限标识是否存在
      const where: WhereOptions = {
        permission: {
          [Op.eq]: permission,
          [Op.not]: null,
        },
        menu_id: {
          [Op.ne]: menu_id,
        },
      };
      // 如果有结果，则证明已存在
      const exist = await this.menuModel.findOne({ where });
      if (exist) {
        return responseMessage({}, '权限标识已存在!', -1);
      }
    }
    // 如果通过则执行 sql save 语句
    const result = await this.menuModel.update(menuInfo, {
      where: { menu_id },
    });
    return responseMessage(result);
  }

  /**
   * @description: 删除菜单数据
   */
  async deleteMenu(menu_id: string): Promise<Response<number>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.menuModel.findOne({
      where: { parent_id: menu_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, '当前数据存在子级，不能删除!', -1);
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.menuModel.destroy({ where: { menu_id } });
    return responseMessage(result);
  }
}
