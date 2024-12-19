/*
 * @Description: 工单管理模块
 */

export default {
  path: '/ticket-manage',
  name: 'ticket-manage',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/ticket-manage',
      redirect: '/ticket-manage/freshdesk',
      exact: true,
    },
    {
      path: '/ticket-manage/freshdesk',
      name: 'freshdesk',
      component: './TicketManage/Freshdesk',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],
};
