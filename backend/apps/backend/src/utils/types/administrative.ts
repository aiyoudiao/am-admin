/*
 * @Description: Administrative Attributes
 */
import type {
  AnnouncementTypes,
  CommonTypes,
  Flag,
  OrgTypes,
  Times,
} from '@/utils/types';

import { UserAttributes } from './system';

/**
 * @description: am_organization Attributes
 */
export type OrgAttributes = {
  org_id: string; // 组织id
  org_name: string; // 组织名称
  org_code: string; // 组织编码
  org_type: OrgTypes; // 组织类型
  children?: OrgAttributes[];
} & Times &
  CommonTypes;

/**
 * @description: am_jobs Attributes
 */
export type JobsAttributes = {
  jobs_id: string; // 岗位id
  jobs_name: string; // 岗位名称
  children?: JobsAttributes[];
} & Times &
  Pick<OrgAttributes, 'org_id'> &
  Omit<CommonTypes, 'status'>;

/**
 * @description: am_announcement Attributes
 */
export type AnnouncementAttributes = {
  announcement_id: string; // id 主键
  title: string; // 标题
  content: string; // 正文内容
  type: AnnouncementTypes; // 类型
  pinned: Flag; // 是否置顶
} & Times &
  Pick<UserAttributes, 'user_id'> &
  Pick<CommonTypes, 'status'>;

/**
 * @description: am_already Attributes
 */
export type AlreadyAttributes = {
  id: string; // id 主键
} & Times &
  Pick<UserAttributes, 'user_id'> &
  Pick<AnnouncementAttributes, 'announcement_id'>;
