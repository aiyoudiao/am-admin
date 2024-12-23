/*
 * @Description: 保存岗位数据 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description: 保存岗位数据 Dto
 */
export class SaveJobsManagementDto {
  @ApiProperty({
    type: String,
    description: '父级id',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
    required: false,
  })
  parent_id?: string;

  @ApiProperty({
    type: String,
    description: '岗位名称',
    default: 'UI 设计师',
  })
  jobs_name: string;

  @ApiProperty({
    type: String,
    description: '所属组织',
    default: '0c01ef7d-2f6f-440a-b642-62564d41f473',
  })
  org_id: string;

  @ApiProperty({
    type: Number,
    description: '排序',
    default: 1,
  })
  sort: number;

  @ApiProperty({
    type: String,
    description: '岗位描述',
    default:
      '“UI”的本义是用户界面，是英文User和interface的缩写。UI设计师简称UID（User Interface Designer），指从事对软件的人机交互、操作逻辑、界面美观的整体设计工作的人。',
  })
  describe: string;
}
