// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import * as Plugin_0 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/app.tsx';
import * as Plugin_1 from '@@/core/helmet.ts';
import * as Plugin_2 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-clickToComponent/runtime.tsx';
import * as Plugin_3 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-access/runtime.tsx';
import * as Plugin_4 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-antd/runtime.tsx';
import * as Plugin_5 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-initialState/runtime.tsx';
import * as Plugin_6 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-layout/runtime.tsx';
import * as Plugin_7 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-locale/runtime.tsx';
import * as Plugin_8 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-model/runtime.tsx';
import * as Plugin_9 from '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-keepalive/runtime.tsx';
import { PluginManager } from 'umi';

function __defaultExport (obj) {
  if (obj.default) {
    return typeof obj.default === 'function' ? obj.default() :  obj.default
  }
  return obj;
}
export function getPlugins() {
  return [
    {
      apply: __defaultExport(Plugin_0),
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/app.tsx',
    },
    {
      apply: Plugin_1,
      path: process.env.NODE_ENV === 'production' ? void 0 : '@@/core/helmet.ts',
    },
    {
      apply: Plugin_2,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-clickToComponent/runtime.tsx',
    },
    {
      apply: Plugin_3,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-access/runtime.tsx',
    },
    {
      apply: Plugin_4,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-antd/runtime.tsx',
    },
    {
      apply: Plugin_5,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-initialState/runtime.tsx',
    },
    {
      apply: Plugin_6,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-layout/runtime.tsx',
    },
    {
      apply: Plugin_7,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-locale/runtime.tsx',
    },
    {
      apply: Plugin_8,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-model/runtime.tsx',
    },
    {
      apply: Plugin_9,
      path: process.env.NODE_ENV === 'production' ? void 0 : '/Users/zakj/Desktop/work/code/lf/shared/ticket-shared/am-admin/frontend/apps/frontend/src/.umi/plugin-keepalive/runtime.tsx',
    },
  ];
}

export function getValidKeys() {
  return ['default','patchRoutes','patchClientRoutes','modifyContextOpts','modifyClientRenderOpts','rootContainer','innerProvider','i18nProvider','accessProvider','dataflowProvider','outerProvider','render','onRouteChange','antd','getInitialState','layout','locale','qiankun','request','getKeepAlive','tabsLayout','getCustomTabs',];
}

let pluginManager = null;

export function createPluginManager() {
  pluginManager = PluginManager.create({
    plugins: getPlugins(),
    validKeys: getValidKeys(),
  });


  return pluginManager;
}

export function getPluginManager() {
  return pluginManager;
}
