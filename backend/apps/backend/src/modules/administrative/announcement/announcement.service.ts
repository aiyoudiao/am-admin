/*
 * @Description: Announcement Service
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

import { AmAlready } from '@/models/am_already.model'; // am_already 实体
import { AmAnnouncement } from '@/models/am_announcement.model'; // am_announcement 实体
import { AmUser } from '@/models/am_user.model'; // am_user 实体
import { responseMessage } from '@/utils'; // 全局工具函数
import { ANNOUNCEMENT_TYPE } from '@/utils/enums';
import type { Flag, PageResponse, Response, SessionTypes } from '@/utils/types';

import {
  ListAnnouncementDto,
  SaveAlreadyDto,
  SaveAnnouncementDto,
  unAlreadyDto,
} from './dto';

@Injectable()
export class AnnouncementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(AmAnnouncement)
    private readonly announcementModel: typeof AmAnnouncement,
    @InjectModel(AmAlready)
    private readonly alreadyModel: typeof AmAlready,
    private sequelize: Sequelize,
  ) {}

  /**
   * @description: 获取活动公告列表
   */
  async getAnnouncementList(
    announcementInfo: ListAnnouncementDto,
    session: SessionTypes,
  ): Promise<Response<PageResponse<AmAnnouncement>>> {
    // 解构参数
    const { title, type, status, pinned, pageSize, current, unready } =
      announcementInfo;
    // 获取 seesion 用户 id
    const user_id = session?.currentUserInfo?.user_id;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (title) where.title = { [Op.substring]: title };
    if (type) where.type = { [Op.eq]: type };
    if (status) where.status = { [Op.eq]: status };
    if (pinned) where.pinned = { [Op.eq]: pinned };
    if (unready) {
      where.announcement_id = {
        [Op.notIn]: this.sequelize
          .literal(`(select announcement_id from am_already
        where user_id='${user_id}')`),
      };
    }
    // 查询总条数
    const total = await this.announcementModel.count({ where });
    // 分页查询数据
    const result = await this.announcementModel.findAll({
      attributes: {
        include: [
          'u.cn_name',
          'u.avatar_url',
          [
            this.sequelize.literal(
              `case when u.user_id = '${user_id}' then 1 else 0 end`,
            ),
            'already',
          ],
          [
            this.sequelize.fn('COUNT', this.sequelize.col('a.announcement_id')),
            'read_counts',
          ],
        ],
      },
      group: 'announcement_id',
      // 联表查询
      include: [
        {
          model: AmUser,
          as: 'u',
          attributes: [],
        },
        {
          model: AmAlready,
          as: 'a',
          attributes: [],
        },
      ],
      raw: true,
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [
        ['pinned', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    return responseMessage({ list: result, total });
  }

  /**
   * @description: 保存活动公告
   */
  async saveAnnouncement(
    { announcement_id, ...announcementInfo }: SaveAnnouncementDto,
    session: SessionTypes,
  ): Promise<Response<SaveAnnouncementDto>> {
    // 获取当前登录用户 id
    const user_id = session?.currentUserInfo?.user_id;
    // 判断是新增还是更新
    const result = announcement_id
      ? await this.announcementModel.update(announcementInfo, {
          where: { announcement_id },
        })
      : await this.announcementModel.create({ user_id, ...announcementInfo });
    return responseMessage(result);
  }

  /**
   * @description: 删除活动公告
   */
  async deleteAnnouncement(announcement_id: string): Promise<Response<number>> {
    // 根据主键查找出当前数据
    const currentInfo = await this.announcementModel.findByPk(announcement_id);
    // 如果通过则执行 sql delete 语句
    await this.alreadyModel.destroy({
      where: { announcement_id },
    });
    // 如果通过则执行 sql delete 语句
    const result = await this.announcementModel.destroy({
      where: { announcement_id },
    });
    return responseMessage(result);
  }

  /**
   * @description: 更新是否置顶
   */
  async updatePinned(
    announcement_id: string,
    pinned: Flag,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 am_role 状态
    const result = await this.announcementModel.update(
      { pinned },
      { where: { announcement_id } },
    );
    return responseMessage(result);
  }

  /**
   * @description: 创建已读公告
   */
  async createAlready(
    announcement_id: string,
    session: SessionTypes,
  ): Promise<Response<SaveAlreadyDto>> {
    // 获取当前登录用户 id
    const user_id = session?.currentUserInfo?.user_id;
    // 插入一条已读数据
    const result = await this.alreadyModel.create({ announcement_id, user_id });
    return responseMessage(result);
  }

  /**
   * @description: 查询不同消息类型的未读条数
   */
  async queryUnreadyCount(
    session: SessionTypes,
  ): Promise<Response<unAlreadyDto>> {
    // 获取当前登录用户 id
    const user_id = session?.currentUserInfo?.user_id;
    // 查询条件
    const where: WhereOptions = {
      announcement_id: {
        [Op.notIn]: this.sequelize
          .literal(`(select announcement_id from am_already
        where user_id='${user_id}')`),
      },
    };
    // 查询不同消息类型的条数
    const total = await this.announcementModel.count({
      where: {
        ...where,
      },
    }); // 总条数
    const announcement = await this.announcementModel.count({
      where: {
        type: ANNOUNCEMENT_TYPE.ANNOUNCEMENT,
        ...where,
      },
    }); // 公告
    const activity = await this.announcementModel.count({
      where: {
        type: ANNOUNCEMENT_TYPE.ACTIVITY,
        ...where,
      },
    }); // 活动
    const message = await this.announcementModel.count({
      where: {
        type: ANNOUNCEMENT_TYPE.MESSAGE,
        ...where,
      },
    }); // 消息
    const notification = await this.announcementModel.count({
      where: {
        type: ANNOUNCEMENT_TYPE.NOTIFICATION,
        ...where,
      },
    }); // 通知
    return responseMessage({
      total,
      announcement,
      activity,
      message,
      notification,
    });
  }
}
