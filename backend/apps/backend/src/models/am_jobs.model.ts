/*
 * @Description: AmJobs Entity
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Length,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript';

import { AmOrganization } from '@/models/am_organization.model';
import type { JobsAttributes } from '@/utils/types/administrative';

@Table({ tableName: 'am_jobs' })
export class AmJobs
  extends Model<JobsAttributes, JobsAttributes>
  implements JobsAttributes
{
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '岗位id',
  })
  jobs_id: string;

  //岗位名称
  @NotEmpty({ msg: '岗位名称不能为空' })
  @Length({ min: 2, max: 32, msg: '岗位名称的长度在2-36个字符' })
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '岗位名称' })
  jobs_name: string;

  //所属组织id
  @IsUUID(4)
  @ForeignKey(() => AmOrganization)
  @Column({ type: DataType.UUID, allowNull: false, comment: '所属组织id' })
  org_id: string;

  //父级id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //岗位负责人
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '岗位负责人' })
  leader: string;

  //岗位描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '岗位描述' })
  describe: string;

  //创建人
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  @BelongsTo(() => AmOrganization, { as: 'o' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  orgInfo: AmOrganization;
}
