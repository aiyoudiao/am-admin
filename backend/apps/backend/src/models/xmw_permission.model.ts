/*
 * @Description: XmwPermission Entity
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwMenu } from '@/models/xmw_menu.model';
import { XmwRole } from '@/models/xmw_role.model';
import type { PermissionAttributes } from '@/utils/types/system';

@Table({ tableName: 'xmw_permission' })
export class XmwPermission
  extends Model<PermissionAttributes, PermissionAttributes>
  implements PermissionAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '权限id',
  })
  permission_id: string;

  //角色id
  @IsUUID(4)
  @ForeignKey(() => XmwRole)
  @Column({ type: DataType.UUID, comment: '角色id' })
  role_id: string;

  //菜单id
  @IsUUID(4)
  @ForeignKey(() => XmwMenu)
  @Column({ type: DataType.UUID, comment: '菜单id' })
  menu_id: string;

  @BelongsTo(() => XmwRole)
  roleInfo: XmwRole;

  @BelongsTo(() => XmwMenu)
  menuInfo: XmwMenu;
}
