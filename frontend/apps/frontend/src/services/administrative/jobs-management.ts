/*
 * @Description: 智能行政-岗位管理-API
 */

import { ROUTES } from '@/utils/enums';
import type { CreateJobsParams, SearchParams } from '@/utils/types/administrative/jobs-management';
import { httpRequest } from '@/utils/umiRequest';

const baseURL = ROUTES.JOBSMANAGEMENT;

/**
 * @description: 获取岗位管理列表
 * @param {SearchParams} options
 */
export const getJobsList = (options?: SearchParams) =>
  httpRequest.get<API.JOBSMANAGEMENT[]>(`${baseURL}`, options);

/**
 * @description: 创建岗位数据
 * @param {CreateJobsParams} options
 */
export const createJobs = (options: CreateJobsParams) =>
  httpRequest.post<API.JOBSMANAGEMENT>(`${baseURL}`, options);

/**
 * @description: 更新岗位数据
 * @param {API.JOBSMANAGEMENT} options
 */

export const updateJobs = ({ jobs_id, ...options }: API.JOBSMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${jobs_id}`, options);

/**
 * @description: 删除岗位数据
 * @param {string} jobs_id
 */
export const delJobs = (jobs_id: string) => httpRequest.delete<number>(`${baseURL}/${jobs_id}`);
