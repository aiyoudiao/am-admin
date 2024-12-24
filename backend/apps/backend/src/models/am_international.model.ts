/*
 * @Description: AmInternational Entity
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript';

import { AmUser } from '@/models/am_user.model'; // am_user 实体
import type { InternationalAttributes } from '@/utils/types/system';

@Table({ tableName: 'am_international', underscored: false })
export class AmInternational
  extends Model<InternationalAttributes, InternationalAttributes>
  implements InternationalAttributes
{
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: 'id',
  })
  id: string;

  //国际化字段
  @NotEmpty({ message: '国际化字段不能为空' })
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '国际化字段',
  })
  name: string;

  //中文
  @Column({ type: DataType.STRING(200), comment: '中文' })
  'zh-CN'?: string;

  //英文
  @Column({ type: DataType.STRING(500), comment: '英文' })
  'en-US'?: string;

  //日文
  @Column({ type: DataType.STRING(200), comment: '日文' })
  'ja-JP'?: string;

  //繁体中文
  @Column({ type: DataType.STRING(200), comment: '繁体中文' })
  'zh-TW'?: string;

  //父级id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //创建人
  @IsUUID(4)
  @ForeignKey(() => AmUser)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //子级
  children?: AmInternational[];

  @BelongsTo(() => AmUser, { as: 'u' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: AmUser;
}
