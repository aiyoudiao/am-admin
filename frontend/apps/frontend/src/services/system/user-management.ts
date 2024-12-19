/*
 * @Description: 系统设置-用户管理-API
 */

import { ROUTES } from '@/utils/enums';
import type { PageResponse } from '@/utils/types';
import type { SearchParams, UserStatusProps } from '@/utils/types/system/user-management';
import { httpRequest } from '@/utils/umiRequest';

const baseURL = ROUTES.USERMANAGEMENT;

/**
 * @description:  获取用户列表
 * @param {SearchParams} options
 */
export const getUserList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.USERMANAGEMENT>>(`${baseURL}`, options);

/**
 * @description: 新增用户数据
 * @param {API.USERMANAGEMENT} options
 */
export const createUser = (options: API.USERMANAGEMENT) =>
  httpRequest.post<API.USERMANAGEMENT>(`${baseURL}`, options);

/**
 * @description: 更新用户数据
 * @param {API.USERMANAGEMENT} options
 */
export const updateUser = ({ user_id, ...options }: Partial<API.USERMANAGEMENT>) =>
  httpRequest.put<number[]>(`${baseURL}/${user_id}`, options);

/**
 * @description: 删除用户数据
 * @param {string} user_id
 */
export const delUser = (user_id: string) => httpRequest.delete<number>(`${baseURL}/${user_id}`);

/**
 * @description: 设置角色状态
 * @param {Data} options
 */
export const setUserStatus = ({ user_id, status }: UserStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${user_id}`, { status });
