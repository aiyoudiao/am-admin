import React from 'react';
import { Row, Col, Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TicketCard from './TicketCard';

const { Search } = Input;

export interface TicketItem {
  id: string;
  subject: string;
  content: string;
  requester: string;
  assignee: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  isProcessing: boolean;
}

const data: TicketItem[] = [

  {
    id: '#1001',
    subject: '无法登录系统',
    content: '无法连接到互联网',
    requester: '张三',
    assignee: '李四',
    status: '处理中',
    priority: '高',
    createdAt: '2023-04-01 10:00:00',
    updatedAt: '2024-10-02',
    isProcessing: true,
  },
  {
    id: '#1002',
    subject: '订单退款问题',

    content: '无法连接到互联网',
    requester: '王五',
    assignee: '赵六',
    status: '已解决',
    priority: '中',
    createdAt: '2023-04-02 14:30:00',

    updatedAt: '2024-10-02',
    isProcessing: true,
  },
  {
    id: '#1003',
    subject: '产品功能咨询',

    content: '无法连接到互联网',
    requester: '李明',
    assignee: '王芳',
    status: '新建',
    priority: '低',
    createdAt: '2023-04-03 09:15:00',

    updatedAt: '2024-10-02',
    isProcessing: true,
  },
  {
    id: '#1004',
    subject: '账单错误',
    content: '无法连接到互联网',
    requester: '赵雷',
    assignee: '钱电',
    status: '处理中',
    priority: '高',
    createdAt: '2023-04-04 11:45:00',

    updatedAt: '2024-10-02',
    isProcessing: true,
  },
];

const TicketList: React.FC = () => {
  return (
    <Space direction="vertical" size="large" className="w-full">

      <Row gutter={[16, 16]}>
        {data.map((ticket) => (
          <Col xs={24} sm={24} md={24} lg={24} key={ticket.id}>
            <TicketCard ticket={ticket} />
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default TicketList;

