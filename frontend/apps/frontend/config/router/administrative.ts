/*
 * @Description: 智能行政模块
 */

export default {
  path: '/administrative',
  name: 'administrative',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/administrative',
      redirect: '/administrative/organization',
      exact: true,
    },
    {
      path: '/administrative/announcement',
      name: 'announcement',
      component: './Administrative/Announcement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/administrative/organization',
      name: 'organization',
      component: './Administrative/Organization',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/administrative/jobs-management',
      name: 'jobs-management',
      icon: 'icon-jobs-management',
      component: './Administrative/JobsManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],
};
