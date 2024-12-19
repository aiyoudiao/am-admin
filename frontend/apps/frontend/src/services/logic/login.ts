/*
 * @Description: 用户登录模块 API
 */

import type { LoginTypes } from '@/utils/types';
import type { LoginParams } from '@/utils/types/login'
import { httpRequest } from '@/utils/umiRequest'

/**
 * @description: 用户登录接口
 * @param {LoginParams} options
 * @Author: 白雾茫茫丶
 */
export const Login = (options?: LoginParams) => httpRequest.post<LoginTypes>('/auth/login', options);

/**
 * @description: 用户退出登录
 * @param {LoginParams} options
 * @Author: 白雾茫茫丶
 */
export const Logout = () => httpRequest.post<Record<string, any>>('/auth/logout');

/**
 * @description: 获取当前用户信息
 * @Author: 白雾茫茫丶
 */
export const getUserInfo = () => httpRequest.get<API.USERMANAGEMENT>('/auth/user-info');

/**
 * @description: 获取当前用户按钮权限
 * @Author: 白雾茫茫丶
 */
export const getPermissions = () => httpRequest.get<string[]>('/auth/permissions');

/**
 * @description: 获取用户权限菜单
 * @Author: 白雾茫茫丶
 */
export const getRoutesMenus = () => httpRequest.get<API.MENUMANAGEMENT[]>('/auth/routes-menu');

/**
 * @description: 获取图形验证码
 * @Author: 白雾茫茫丶
 */
export const getCaptcha = () => httpRequest.get<string>('/auth/verify-code');