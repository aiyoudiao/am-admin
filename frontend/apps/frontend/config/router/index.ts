/*
 * @Description: 导出路由
 */

import administrative from './administrative'; // 智能行政模块
import dashboard from './dashboard'; // 指示面板模块
import features from './features'; // 功能页模块
import personalCenter from './personalCenter'; // 个人中心模块
import setting from './system'; // 系统设置模块
import technicalDocument from './technicalDocument'; // 技术文档模块
import ticketManage from './ticketManage'; // 工单管理模块

export default [
  dashboard,
  ticketManage,
  administrative,
  personalCenter,
  features,
  technicalDocument,
  setting,
];
