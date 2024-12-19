/*
 * @Description: 公共模块
 */

import { httpRequest } from '@/utils/umiRequest'

/**
 * @description: 获取掘金文章列表
 */
export const getJuejinArticleList = (options) => httpRequest.post('/common/juejin', options);