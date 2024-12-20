import { AppRouteMenu } from '../types'

export const RootRoute: AppRouteMenu[] = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard/work-bench',
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/work-bench',
    exact: true,
  },
  {
    path: '/dashboard/work-bench',
    name: 'work-bench',
    component: './Dashboard/Workbench',
    access: 'adminRouteFilter',
    exact: true,
  },
]

export const LoginRoute: AppRouteMenu[] = [

  {
    path: '/user',
    redirect: '/user/login',
    layout: false,
    exact: true,
  },
  {
    name: 'login',
    path: '/user/login',
    component: './User/Login',
    layout: false,
    hideInMenu: true,
  }]

export const NotFoundRoute: AppRouteMenu = {
  path: '*',
  layout: false,
  component: './404',
  hideInMenu: true,
}


export const localRoutes: AppRouteMenu[] = [...RootRoute, ...LoginRoute, NotFoundRoute]
