/*
 * @Description: 查询国际化列表参数 Dto
 */
import { ApiProperty } from '@nestjs/swagger';
/**
 * @description: 查询国际化列表参数 Dto
 */
export class ListInternationalDto {
  @ApiProperty({
    type: String,
    description: '国际化字段',
    default: 'international',
    required: false,
  })
  name?: string;

  @ApiProperty({
    type: Date,
    description: '开始日期',
    default: '2022-10-01 00:00:00',
    required: false,
  })
  start_time?: Date;

  @ApiProperty({
    type: Date,
    description: '结束日期',
    default: '2022-10-02 23:59:59',
    required: false,
  })
  end_time?: Date;

  @ApiProperty({
    type: Boolean,
    description: '是否是菜单，用于展示菜单树形结构',
    default: false,
    required: false,
  })
  isMenu?: boolean;
}
