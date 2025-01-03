/*
 * @Description: 查询列表返回响应体 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { AmAlready } from '@/models/am_already.model'; // am_already 实体
import { AmAnnouncement } from '@/models/am_announcement.model'; // am_announcement 实体
import type { PageResponse } from '@/utils/types';

/**
 * @description: 活动公告列表响应体结构 Dto
 */
export class ResponseAnnouncementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      list: [
        {
          announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
          user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
          title: '公司给每个人薪资翻倍拉！',
          content: '<p>哈哈哈、开心</p>',
          type: '1',
          status: 1,
          pinned: 1,
          created_time: '2023-08-25 09:07:08',
          updated_time: '2023-08-26 09:07:08',
        },
      ],
      total: 1,
    },
  })
  data: PageResponse<AmAnnouncement>;
}

/**
 * @description: 创建活动公告 Dto
 */
export class CreateAnnouncementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
      user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
      title: '公司给每个人薪资翻倍拉！',
      content: '<p>哈哈哈、开心</p>',
      type: '1',
      status: 1,
      pinned: 1,
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: AmAnnouncement;
}

/**
 * @description: 已读活动公告 Dto
 */
export class CreateAlreadyDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
      user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
    },
  })
  data: AmAlready;
}
