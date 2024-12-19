import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';

import { AmAnnouncement } from '@/models/am_announcement.model';
import type { AlreadyAttributes } from '@/utils/types/administrative';

@Table({ tableName: 'am_already' })
export class AmAlready
  extends Model<AlreadyAttributes, AlreadyAttributes>
  implements AlreadyAttributes
{
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '主键id',
  })
  id: string;

  // 活动公告 id
  @IsUUID(4)
  @ForeignKey(() => AmAnnouncement)
  @Column({ type: DataType.UUID, allowNull: false, comment: '活动公告 id' })
  announcement_id: string;

  // 用户 id
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '用户 id' })
  user_id: string;

  @BelongsTo(() => AmAnnouncement, { as: 'a' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  announcementInfo: AmAnnouncement;
}
