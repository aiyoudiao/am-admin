import React from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/plots';

const TicketReport: React.FC = () => {
  const statusData = [
    { type: '新建', value: 27 },
    { type: '处理中', value: 25 },
    { type: '已解决', value: 18 },
    { type: '已关闭', value: 15 },
  ];

  const priorityData = [
    { priority: '低', count: 38 },
    { priority: '中', count: 52 },
    { priority: '高', count: 61 },
    { priority: '紧急', count: 145 },
  ];

  const statusConfig = {
    appendPadding: 10,
    data: statusData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };

  const priorityConfig = {
    data: priorityData,
    xField: 'priority',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="工单状态分布">
          <Pie {...statusConfig} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="工单优先级分布">
          <Column {...priorityConfig} />
        </Card>
      </Col>
    </Row>
  );
};

export default TicketReport;

