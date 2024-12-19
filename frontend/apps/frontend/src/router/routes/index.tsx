import { AppRouteMenu } from '../types'

export const RootRoute: AppRouteMenu[] = [
  {
    path: '/',
    access: 'adminRouteFilter',
    exact: true,
    redirect: '/dashboard/work-bench',
  },
  {
    name: '首页',
    path: '/dashboard/work-bench',
    component: './Dashboard/Workbench',
    access: 'adminRouteFilter',
    exact: true,
  },
]

export const LoginRoute: AppRouteMenu = {
  name: 'login',
  path: '/user/login',
  component: './User/Login',
  layout: false,
  hideInMenu: true,
}

export const NotFoundRoute: AppRouteMenu = {
  path: '*',
  layout: false,
  component: './404',
  hideInMenu: true,
}


export const localRoutes: AppRouteMenu[] = [...RootRoute, LoginRoute, NotFoundRoute]
