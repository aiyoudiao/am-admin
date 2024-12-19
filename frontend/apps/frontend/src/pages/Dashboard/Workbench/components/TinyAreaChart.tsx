/*
 * @Description: 迷你面积图
 */

import { Tiny } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { random } from 'lodash-es';
import { FC, useImperativeHandle, useState } from 'react'

import type { ChartProps } from '../type'

type DataType = {
  value: number;
  index: number;
}

const TinyAreaChart: FC<ChartProps> = ({ onRef, colorPrimary }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    const result: DataType[] = [];
    for (let i = 10; i > 0; i--) {
      result.push({
        index: i,
        value: random(1000, 10000),
      })
    }
    setTimeout(() => {
      setLoading(false);
      setData(result)
    }, 1000)
  }

  const config = {
    data,
    height: 60,
    shapeField: 'smooth',
    xField: 'index',
    yField: 'value',
    style: {
      fill: colorPrimary,
      fillOpacity: 0.6,
    },
  };

  useMount(() => {
    reset()
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))
  return (
    <Spin spinning={loading}>
      <Tiny.Area {...config} />
    </Spin>
  )
}
export default TinyAreaChart
