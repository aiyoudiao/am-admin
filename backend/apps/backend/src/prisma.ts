import { PrismaClient } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();

// 导出主要数据模型

export const am_already = prisma.am_already;
export const am_announcement = prisma.am_announcement;
export const am_comment = prisma.am_comment;
export const am_email = prisma.am_email;
export const am_international = prisma.am_international;
export const am_jobs = prisma.am_jobs;
export const am_logs = prisma.am_logs;
export const am_menu = prisma.am_menu;
export const am_organization = prisma.am_organization;
export const am_permission = prisma.am_permission;
export const am_role = prisma.am_role;
export const am_ticket = prisma.am_ticket;
export const am_user = prisma.am_user;

import {
  am_menu_menu_type,
  am_announcement_type,
  am_organization_org_type,
  am_menu_target,
  am_menu_layout,
  am_user_sex,
  am_menu_navTheme,
  am_ticket_status,
  am_menu_headerTheme,
} from '@prisma/client';

// 枚举类型
export const enums = {
  am_menu: {
    type: am_menu_menu_type,
    target: am_menu_target,
    layout: am_menu_layout,
    navTheme: am_menu_navTheme,
    headerTheme: am_menu_headerTheme,
  },
  am_announcement: {
    type: am_announcement_type,
  },
  am_organization: {
    type: am_organization_org_type,
  },
  am_user: {
    sex: am_user_sex,
  },
  am_ticket: {
    status: am_ticket_status,
  },
} as const;

// 导出 prisma 实例
export const am_prisma = prisma;
