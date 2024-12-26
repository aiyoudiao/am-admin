import React from 'react';
import { Card, Row, Col, Statistic, Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { UserOutlined, SolutionOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TicketReport from './components/TicketReport';

const Dashboard: React.FC = () => {
  return (
    <main>
      <ProCard
        title={<strong>工单概览</strong>}
        extra="最近30天"
        split="vertical"
        headerBordered
        bordered
        className="mb-4"
      >
        <ProCard colSpan="25%">
          <Statistic
            title="总工单数"
            value={1128}
            prefix={<SolutionOutlined />}
          />
        </ProCard>
        <ProCard colSpan="25%">
          <Statistic
            title="待处理工单"
            value={18}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ClockCircleOutlined />}
          />
        </ProCard>
        <ProCard colSpan="25%">
          <Statistic
            title="已解决工单"
            value={93}
            valueStyle={{ color: '#3f8600' }}
            prefix={<CheckCircleOutlined />}
          />
        </ProCard>
        <ProCard colSpan="25%">
          <Statistic
            title="客户满意度"
            value={98.6}
            precision={1}
            suffix="%"
            prefix={<UserOutlined />}
          />
        </ProCard>
      </ProCard>
      <TicketReport />
    </main>
  );
};

export default Dashboard;

