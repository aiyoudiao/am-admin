/*
 * @Description: 系统设置模块
 */

export default {
  path: '/system',
  name: 'system',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/system',
      redirect: '/system/user-management',
      exact: true,
    },
    {
      path: '/system/user-management',
      name: 'user-management',
      component: './System/UserManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/menu-management',
      name: 'menu-management',
      component: './System/MenuManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/role-management',
      name: 'role-management',
      component: './System/RoleManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/internationalization',
      name: 'internationalization',
      component: './System/Internationalization',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/operation-log',
      name: 'operation-log',
      component: './System/OperationLog',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],
};
