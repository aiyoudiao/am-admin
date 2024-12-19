/*
 * @Description: 全局入口文件
 */

import { Settings as LayoutSettings } from '@ant-design/pro-components'; // 高级组件
import { addLocale, history, RuntimeConfig } from '@umijs/max';
import { assign, eq, forEach, get, isEmpty, isNil } from 'lodash-es'

import { BasicLayout } from '@/components/BasicLayout'; // 全局 layout 布局
import TabsLayout, { TabsLayoutProps } from '@/components/TabsLayout' // 多标签页配置
import { getAllLocalesLang } from '@/services/system/internationalization'
import { forceRedirect, getLocalStorageItem, initUserAuthority, removeLocalStorageItem, setLocalStorageItem } from '@/utils' // 全局工具函数
import { ANTD_LANGS } from '@/utils/const'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes, Langs } from '@/utils/types'
import umiRequest from '@/utils/umiRequest'; // umi-request 请求封装

import defaultSettings from '../config/defaultSettings'; // 全局默认配置
import { buildRoutes } from './router/helper/route';
import { getRoutesMenus } from './services/logic/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {

  // 获取 LAYOUT 的值
  const Layout_Settings = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT) || defaultSettings;
  // 获取 ACCESS_TOKEN
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN) || undefined;
  // 存储到 localstorage
  setLocalStorageItem(LOCAL_STORAGE.LAYOUT, Layout_Settings)
  // 初始化多语言
  const Locales = get(await getAllLocalesLang(), 'data', {})
  // 动态添加多语言
  if (!isEmpty(Locales) && !isNil(Locales)) {
    forEach(Locales, (value: Record<string, string>, key: Langs) => {
      addLocale(key, value, ANTD_LANGS[key]);
    })
  }
  // 初始化数据
  const initialState: InitialStateTypes = {
    // Locales,
    Access_token: ACCESS_TOKEN,
    Settings: Layout_Settings,
    Collapsed: false,
  }
  // 判断是否登录，没有登录跳转到登录页
  if (!ACCESS_TOKEN) {
    history.push(ROUTES.LOGIN);
    return initialState
  }
  // 判断在登录页是否已登录，已登录则跳转主页
  if (eq(location.pathname, ROUTES.LOGIN) && ACCESS_TOKEN) {
    forceRedirect('/');
  }
  // 如果不是登录页面，执行
  if (!eq(location.pathname, ROUTES.LOGIN)) {
    const result = await initUserAuthority()

    // 初始化全局状态
    return assign(initialState, result)
  }
  return initialState
}

/**
 * @description: 全局 lyout 布局
 * @doc ProLayout 支持的api https://procomponents.ant.design/components/layout
 */
export const layout = BasicLayout

/**
 * @description: 完全覆盖内置的多 Tabs 组件，需要搭配配置 hasCustomTabs:true 使用。
 * @doc https://alitajs.com/zh-CN/docs/guides/tabs#getcustomtabs
 */
export const getCustomTabs = () => (props: TabsLayoutProps) => <TabsLayout {...props} />

/**
 * @description: request 配置，可以配置错误处理，它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = umiRequest;

let dynamicRoutes: any[] = []
/**
 * @name patchClientRoutes 修改路由表
 * @doc https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
 */
export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = async ({ routes }) => {
  buildRoutes(routes, dynamicRoutes)
}

/**
 * @name render 覆写渲染函数
 * @doc https://umijs.org/docs/api/runtime-config#renderoldrender-function
 */
export const render: RuntimeConfig['render'] = (oldRender) => {
  // 获取 ACCESS_TOKEN
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN) || undefined;
  if (ACCESS_TOKEN) {
    getRoutesMenus()
      .then((routeMenuInfo) => {
        dynamicRoutes = get(routeMenuInfo, 'data', [])
      })
      .catch(() => {
        removeLocalStorageItem(ACCESS_TOKEN)
        forceRedirect(ROUTES.LOGIN);
      })
      .finally(() => {
        oldRender()
      })
  } else {
    dynamicRoutes = []
    oldRender()
  }
}
