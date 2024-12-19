/*
 * @Description: 全局组件 loading 配置
 */

import { Spin } from 'antd'
import { FC } from 'react'

const ComponentLoading: FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0 18px', overflow: 'hidden' }}>
      <Spin />
    </div>
  )
}
export default ComponentLoading