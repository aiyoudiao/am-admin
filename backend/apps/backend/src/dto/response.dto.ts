/*
 * @Description: 响应体 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

import type { PageResponse } from '@/utils/types';

/**
 * @description: 统一响应体 Dto
 */
export class ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {},
  })
  data: any;

  @ApiProperty({
    type: String,
    description: '响应信息',
    default: '操作成功！',
  })
  msg: string;

  @ApiProperty({
    type: Number,
    description: '状态码',
    default: 200,
  })
  code: number;
}

/**
 * @description: 更新数据 Dto
 */
export class UpdateResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: [1],
  })
  data: PageResponse<number[]>;
}

/**
 * @description: 删除数据 Dto
 */
export class DeleteResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: 1,
  })
  data: PageResponse<number>;
}
