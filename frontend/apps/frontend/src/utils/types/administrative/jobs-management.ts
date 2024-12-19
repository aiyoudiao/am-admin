/*
 * @description 岗位管理模块
 */
import type { SearchTimes } from '@/utils/types';

/**
 * @description: 新增岗位 Params
 */
export type CreateJobsParams = Pick<
  API.JOBSMANAGEMENT,
  'parent_id' | 'jobs_name' | 'org_id' | 'leader' | 'sort' | 'describe'
>;

/**
 * @description: FormTemplate Props
 */
export type FormTemplateProps = {
  treeData: API.JOBSMANAGEMENT[]; // 岗位树形数据
  orgTree: API.ORGANIZATION[]; // 组织树形数据
  reloadTable: () => void; // 表格刷新
  parent_id?: string; // 父级id
  open: boolean;
  setOpenDrawerFalse: () => void;
};

/**
 * @description: 头部搜索表单 Params
 */
export type SearchParams = Partial<Pick<API.JOBSMANAGEMENT, 'jobs_id' | 'org_id'>> & SearchTimes;
