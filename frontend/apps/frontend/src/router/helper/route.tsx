import React from 'react'
import { Exception } from '@/components/Exception'
import { Redirect } from '@/components/Redirect'
// import { SimpleLayout } from '@/layouts/simple'
import { localRoutes } from '../routes'
import type { AppRouteMenu } from '../types'

/**
 * 构建路由
 * @param rawRoutes 原始路由，由 Umi 自动生成
 * @param dynamicRoutes 动态路由，由 Api 接口返回
 * @implements 由动态路由表完全覆盖原始路由表，把原始路由信息按需补充到动态路由信息上
 */
export const buildRoutes = (rawRoutes: AppRouteMenu[], dynamicRoutes: AppRouteMenu[]) => {
  // 找到主布局路由，构建路径与组件的映射关系，并清空原始路由表
  const baseLayout = rawRoutes.find((item) => item.isLayout)?.children || []
  const layout = baseLayout.find((item) => item.isLayout)?.children || baseLayout

  const routeComponents = new Map<string, React.ReactNode>()
  layout.forEach((child) => {
    routeComponents.set(child.id!, child.element)
  })
  while (layout.length) {
    layout.pop()
  }

  // 转换路由，使用全局布局添加到主布局路由下，反之添加根路由下并包裹简易布局
  const routes = transformRoute([...localRoutes, ...dynamicRoutes], routeComponents)
  routes.forEach((route) => {
    if (route.layout !== false) {
      layout.push(route)
    } else {
      rawRoutes.unshift({
        ...route,
        element: route.element,
      })
    }
  })

  // DEBUG: 调试路由信息
  console.log('调试路由信息', routes, routeComponents)
}

/**
 * @description: 白名单列表
 * 在这个名单下，就不是约定俗称的 pages/模块名称/index，而是直接平铺到 pages 目录下
 * TODO: 后期直接在菜单中明确配置文件路径为 pages/模块名称/index，就可以把下面这段转换key的代码撤掉了
 */
// const whiteList = ['404']

// /**
//  * 转换组件路径的map key
//  * @param componentPath 转换前的组件路径名称
//  * @returns 转换后的组件的 map key
//  */
// function transformComponentKey(componentPath?: string) {
//   const pureComponentPath = componentPath?.replace?.(/^\.\//, '')
//   return whiteList.some(whiteItem => pureComponentPath?.includes(whiteItem)) ? pureComponentPath : pureComponentPath?.concat?.('/index')
// }

function transformComponentKey(componentPath?: string) {
  const pureComponentPath = componentPath?.replace?.(/^\.\//, '')
  return pureComponentPath?.concat?.('/index')
}

/**
 * 转换路由
 * @param routes 路由列表
 * @param routeComponents 路由对应的组件映射
 * @implements 通过组件路径找到组件元素
 */
function transformRoute(routes: AppRouteMenu[], routeComponents: Map<string, React.ReactNode>, access?: string | undefined) {

  /** @description: 继续递归处理路由 */
  const handler = (route: AppRouteMenu) => {
    route.access = route.access || access;
    route.children = route.routes;
    route.children && transformRoute(route.children, routeComponents, 'adminRouteFilter')
  }

  routes.forEach((route) => {
    const component = transformComponentKey(route.component)

    // 组件不存在，可重定向
    if (!component && route.redirect) {
      route.element = <Redirect path={route.redirect} />
      handler(route)
      return
    }

    // 组件不存在，且不可重定向，则警告
    if (!component && !route.redirect) {
      console.warn(`请正确配置路由 ${route.name} 的 component 属性！`)
      handler(route)
      return;
    }

    // 组件路径存在
    if (component) {
      const element = routeComponents.get(component as string)
      if (element) {
        route.element = element
        handler(route)
        return
      }
      // 找不到路由，就 404
      route.element = routeComponents.get('404');
    }

    handler(route)
  })
  return routes
}
