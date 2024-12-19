/*
 * @Description: 自定义操作列表
 */

import { HeaderProps } from '@ant-design/pro-components'
import { SelectLang } from '@umijs/max'

import FullScreen from './FullScreen' // 全屏
import NoticeBell from './NoticeBell' // 消息铃铛

export default function actionsRender(props: HeaderProps) {
  // 判断是否侧边布局
  const isSide = props.layout === 'side'
  if (props.isMobile || typeof window === 'undefined') return [];
  return [
    // props.layout !== 'side' && document.body.clientWidth > 1400 ? (
    //   <SearchInput />
    // ) : undefined,
    <NoticeBell key="NoticeBell" />,
    // 全屏
    <FullScreen key="FullScreen" />,
    // 多语言
    <SelectLang reload={false} key="SelectLang" style={{ padding: isSide ? 0 : 6 }} />,
  ];
}