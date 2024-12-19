/*
 * @Description: AmPermission Entity
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  Table,
} from 'sequelize-typescript';

import { AmMenu } from '@/models/am_menu.model';
import { AmRole } from '@/models/am_role.model';
import type { PermissionAttributes } from '@/utils/types/system';

@Table({ tableName: 'am_permission' })
export class AmPermission
  extends Model<PermissionAttributes, PermissionAttributes>
  implements PermissionAttributes
{
  @IsUUID(4)
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '权限id',
  })
  permission_id: string;

  //角色id
  @IsUUID(4)
  @ForeignKey(() => AmRole)
  @Column({ type: DataType.UUID, comment: '角色id' })
  role_id: string;

  //菜单id
  @IsUUID(4)
  @ForeignKey(() => AmMenu)
  @Column({ type: DataType.UUID, comment: '菜单id' })
  menu_id: string;

  @BelongsTo(() => AmRole)
  roleInfo: AmRole;

  @BelongsTo(() => AmMenu)
  menuInfo: AmMenu;
}
