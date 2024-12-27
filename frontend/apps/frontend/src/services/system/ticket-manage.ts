import { httpRequest } from '@/utils/umiRequest';

const baseURL = '/system/ticket-manage';

/**
 * @description: 获取工单列表
 * @param {any} options
 */
export const getTicketList = (options?: any) => httpRequest.get<any[]>(`${baseURL}`, options);
