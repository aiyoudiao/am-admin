/*
 * @Description: OperationLogs Service
 */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { assign, compact, isArray, values } from 'lodash';
import { lastValueFrom, map } from 'rxjs';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import UAParser from 'ua-parser-js';

import { AmLogs } from '@/models/am_logs.model'; // am_logs 实体
import { AmUser } from '@/models/am_user.model'; // am_user 实体
import { getRealIp, responseMessage } from '@/utils'; // 全局工具函数
import type { PageResponse, Response, SessionTypes } from '@/utils/types';
import type { LogsAttributes } from '@/utils/types/system';

import { ListOperationLogsDto } from './dto';
@Injectable({ scope: Scope.REQUEST })
export class OperationLogsService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { session: SessionTypes },
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(AmLogs)
    private readonly logsModel: typeof AmLogs,
    @InjectModel(AmUser)
    private readonly userModel: typeof AmUser,
    private readonly httpService: HttpService,
  ) {}

  /**
   * @description: 获取用户真实ip
   */
  async getLocationByIp(ipAddress: string): Promise<any> {
    try {
      const response = await lastValueFrom<any>(
        this.httpService
          .get(
            `https://restapi.amap.com/v3/ip?key=${process.env.GAODE_MAP_KEY}&ip=${ipAddress}`,
          )
          .pipe(map((res) => res.data)),
      );
      if (response?.status === '1') {
        const { province, city, adcode } = response;
        return {
          province: isArray(province) ? undefined : province,
          city: isArray(city) ? undefined : city,
          adcode: isArray(adcode) ? undefined : adcode,
        };
      }
      return {};
    } catch (error) {
      return {};
    }
  }

  /**
   * @description: 保存操作日志
   */
  async logAction() {
    const { originalUrl, method, headers, body, query } = this.request;
    // 获取请求代理信息
    const userAgent = headers['user-agent'];
    // 获取 session 用户信息
    let { currentUserInfo } = this.request.session;
    // 获取代理 ip
    const realIp = getRealIp(this.request);
    // 登录接口需要单独处理
    const isLogin = originalUrl === '/auth/login';
    if ((currentUserInfo && method.toUpperCase() !== 'GET') || isLogin) {
      if (isLogin) {
        // 查询数据库中对应的用户
        currentUserInfo = await this.userModel.findOne({
          where: { user_name: body.user_name },
        });
      }
      const parser = new UAParser(userAgent);
      // 根据 IP 获取地理信息
      let location = {};
      if (process.env.GAODE_MAP_KEY) {
        location = await this.getLocationByIp(realIp);
      }
      const logData: LogsAttributes = {
        user_id: currentUserInfo.user_id,
        ip: realIp,
        os: Object.values(parser.getOS()).join(' '),
        browser: parser.getBrowser().name,
        method,
        api_url: originalUrl,
        params: { ...body, ...query },
      };
      if (compact(values(location)).length > 0) {
        assign(logData, location);
      }
      // 将数据插入到表中
      await this.logsModel.create(logData);
    }
  }

  /**
   * @description: 获取操作日志列表
   */
  async getLogsList(
    logsInfo: ListOperationLogsDto,
  ): Promise<Response<PageResponse<AmLogs>>> {
    // 解构参数
    const { start_time, end_time, pageSize, current, user_id, method } =
      logsInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (user_id) where.user_id = { [Op.eq]: user_id };
    if (method) where.method = { [Op.eq]: method };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 分页查询数据
    const { count, rows } = await this.logsModel.findAndCountAll({
      // 联表查询
      include: [
        {
          model: AmUser,
          as: 'userInfo',
        },
      ],
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [['created_time', 'desc']], // 排序规则,
    });
    return responseMessage({ list: rows, total: count });
  }

  /**
   * @description: 删除操作日志
   */
  async deleteLogs(ids: string[]) {
    // 如果通过则执行 sql delete 语句
    const result = await this.logsModel.destroy({ where: { log_id: ids } });
    return responseMessage(result);
  }
}
