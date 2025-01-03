/*
 * @Description: 查询列表返回响应体 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { AmInternational } from '@/models/am_international.model'; // am_international 实体

/**
 * @description: 国际化列表响应体结构 Dto
 */
export class ResponseInternationalDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
        name: 'international',
        'zh-CN': '登录成功！',
        'en-US': 'Login successful!',
        'ja-JP': 'ログイン成功!',
        'zh-TW': '登錄成功！',
        parent_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
        founder: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
        founder_name: '谢明伟',
        sort: '1',
        created_time: '2022-10-01 00:00:00',
        updated_time: '2022-10-02 23:59:59',
        children: [],
      },
    ],
  })
  data: AmInternational[];
}

/**
 * @description: 多语言响应体结构 Dto
 */
export class ResponseLangDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      'zh-CN': { 'pages.login.success': '登录成功！' },
      'en-US': { 'pages.login.success': 'Login successful!' },
      'ja-JP': { 'pages.login.success': 'ログイン成功!' },
      'zh-TW': { 'pages.login.success': '登錄成功！' },
    },
  })
  data: AmInternational;
}

/**
 * @description: 创建国际化数据 Dto
 */
export class CreateInternationalDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      name: 'international',
      'zh-CN': '登录成功！',
      'en-US': 'Login successful!',
      'ja-JP': 'ログイン成功!',
      'zh-TW': '登錄成功！',
      parent_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      founder: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
      founder_name: '谢明伟',
      sort: '1',
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: AmInternational;
}
