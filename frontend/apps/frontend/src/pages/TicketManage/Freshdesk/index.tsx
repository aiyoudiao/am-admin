import React, { useEffect, useState } from 'react';
import { Tabs, Card, Row, Col } from 'antd';

import { useBoolean, useRequest } from 'ahooks';
import { formatPerfix, formatResponse } from '@/utils';
import { getTicketList } from '@/services/system/ticket-manage';

import MainLayout from './container/MainLayout';
import TicketList from './components/TicketList';
import CreateTicketForm from './components/CreateTicketForm';
import Dashboard from './container/Dashboard';
import PriorityManager from './components/PriorityManager';
import AssignTicket from './components/AssignTicket';
import KnowledgeBase from './components/KnowledgeBase';
import TicketManagement from './container/TicketManagement';

type TicketStatus = 'needs_support' | 'in_progress' | 'in_review' | 'done' | 'hold';

interface Ticket {
  id: string; // 工单号
  createdAt: string; // 创建时间
  updatedAt: string; // 更新时间
  name?: string; // 创建人
  title: string; // 工单标题
  detail?: string; // 工单内容
  email?: string; // 发件人邮箱
  isComplete: boolean; // 是否完成
  priority: string; // 优先级
  fromImap: boolean; // 是否是通过 Imap 协议拉取
  number: number; // 工单编号
  status: TicketStatus; // 工单状态
  hidden: boolean; // 是否隐藏
  locked: boolean; // 是否锁定
  following?: any; // 关注该工单的用户
}

const tickets: Ticket[] = [
  {
    id: 'TICKET001',
    createdAt: '2024-12-26T18:04:26.000Z',
    updatedAt: '2024-12-26T18:04:26.000Z',
    name: '张三',
    title: '订单未收到',
    detail: '客户反馈订单已显示发货，但未收到货物。',
    email: 'zhangsan@example.com',
    isComplete: false,
    priority: '高',
    fromImap: true,
    number: 1,
    status: 'needs_support',
    hidden: false,
    locked: false,
    following: ['support1', 'support2'],
  },
  {
    id: 'TICKET002',
    createdAt: '2024-12-26T18:05:26.000Z',
    updatedAt: '2024-12-26T18:05:26.000Z',
    name: '李四',
    title: '产品质量问题',
    detail: '客户反馈收到的产品有质量问题，需要退换货。',
    email: 'lisi@example.com',
    isComplete: false,
    priority: '中',
    fromImap: false,
    number: 2,
    status: 'in_progress',
    hidden: false,
    locked: false,
    following: ['support3'],
  },
  {
    id: 'TICKET003',
    createdAt: '2024-12-26T18:06:26.000Z',
    updatedAt: '2024-12-26T18:06:26.000Z',
    name: '王五',
    title: '订单取消请求',
    detail: '客户请求取消未发货的订单。',
    email: 'wangwu@example.com',
    isComplete: false,
    priority: '低',
    fromImap: true,
    number: 3,
    status: 'in_review',
    hidden: false,
    locked: false,
    following: [],
  },
  {
    id: 'TICKET004',
    createdAt: '2024-12-26T18:07:26.000Z',
    updatedAt: '2024-12-26T18:07:26.000Z',
    name: '赵六',
    title: '发票问题',
    detail: '客户需要电子发票，但未收到相关邮件。',
    email: 'zhaoliu@example.com',
    isComplete: true,
    priority: '高',
    fromImap: false,
    number: 4,
    status: 'done',
    hidden: false,
    locked: false,
    following: ['support4', 'support5'],
  },
  {
    id: 'TICKET005',
    createdAt: '2024-12-26T18:08:26.000Z',
    updatedAt: '2024-12-26T18:08:26.000Z',
    name: '孙七',
    title: '支付问题',
    detail: '客户反馈支付过程中遇到问题，无法完成订单。',
    email: 'sunqi@example.com',
    isComplete: false,
    priority: '中',
    fromImap: true,
    number: 5,
    status: 'hold',
    hidden: false,
    locked: false,
    following: ['support6'],
  },
  {
    id: 'TICKET006',
    createdAt: '2024-12-26T18:09:26.000Z',
    updatedAt: '2024-12-26T18:09:26.000Z',
    name: '周八',
    title: '物流信息更新',
    detail: '客户反馈物流信息未更新，无法跟踪订单。',
    email: 'zhouba@example.com',
    isComplete: false,
    priority: '高',
    fromImap: false,
    number: 6,
    status: 'needs_support',
    hidden: false,
    locked: false,
    following: ['support7', 'support8'],
  },
  {
    id: 'TICKET007',
    createdAt: '2024-12-26T18:10:26.000Z',
    updatedAt: '2024-12-26T18:10:26.000Z',
    name: '吴九',
    title: '优惠券使用问题',
    detail: '客户反馈优惠券无法使用，订单无法享受折扣。',
    email: 'wujio@example.com',
    isComplete: false,
    priority: '中',
    fromImap: true,
    number: 7,
    status: 'in_progress',
    hidden: false,
    locked: false,
    following: ['support9'],
  },
  {
    id: 'TICKET008',
    createdAt: '2024-12-26T18:11:26.000Z',
    updatedAt: '2024-12-26T18:11:26.000Z',
    name: '郑十',
    title: '账户登录问题',
    detail: '客户反馈无法登录账户，需要重置密码。',
    email: 'zhengshi@example.com',
    isComplete: false,
    priority: '低',
    fromImap: false,
    number: 8,
    status: 'in_review',
    hidden: false,
    locked: false,
    following: [],
  },
  {
    id: 'TICKET009',
    createdAt: '2024-12-26T18:12:26.000Z',
    updatedAt: '2024-12-26T18:12:26.000Z',
    name: '钱十一',
    title: '订单重复收费',
    detail: '客户反馈订单被重复收费，需要退款。',
    email: 'qianshiyi@example.com',
    isComplete: true,
    priority: '高',
    fromImap: true,
    number: 9,
    status: 'done',
    hidden: false,
    locked: false,
    following: ['support10', 'support11'],
  },
  {
    id: 'TICKET010',
    createdAt: '2024-12-26T18:13:26.000Z',
    updatedAt: '2024-12-26T18:13:26.000Z',
    name: '吴十二',
    title: '商品缺货',
    detail: '客户反馈订单中的商品缺货，需要更换或退款。',
    email: 'wushier@example.com',
    isComplete: false,
    priority: '中',
    fromImap: false,
    number: 10,
    status: 'hold',
    hidden: false,
    locked: false,
    following: ['support12'],
  },
];

const { TabPane } = Tabs;

const HomePage: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const dummyTicket = tickets;

  const agents = [
    { id: '1', name: '李四' },
    { id: '2', name: '王五' },
    { id: '3', name: '赵六' },
  ];

    /**
   * @description: 获取国际化列表
   */
    const { data: ticketList, runAsync: fetchTicketList } = useRequest(
      async (params) => formatResponse(await getTicketList(params)),
      {
        manual: true,
      },
    );

    useEffect(() => {
      fetchTicketList({})
    }, [])


    console.log('ticketList ', ticketList)

  const handleAssign = (agentId: string) => {
    console.log(`Assigning ticket ${dummyTicket.id} to agent ${agentId}`);
    // Here you would typically update the ticket in your backend
  };

  return (
    <MainLayout>
      {/* <Dashboard /> */}
      <Row gutter={16} className="mt-4">
        <Col span={18}>
          <Card>
            <TicketList />
            {/* <TicketManagement /> */}
            {/* <Tabs activeKey={activeKey} onChange={setActiveKey}>
                <TabPane tab="工单列表" key="1">
                </TabPane>
                <TabPane tab="创建工单" key="3">
                  <CreateTicketForm />
                </TabPane>
                <TabPane tab="优先级管理" key="4">
                  <Card title="工单优先级管理">
                    <PriorityManager ticketId={dummyTicket.id} currentPriority={dummyTicket.priority} />
                  </Card>
                </TabPane>
                <TabPane tab="分配工单" key="5">
                  <Card title="工单分配">
                    <AssignTicket
                      ticketId={dummyTicket.id}
                      currentAssignee={dummyTicket.assignee}
                      agents={agents}
                      onAssign={handleAssign}
                    />
                  </Card>
                </TabPane>
              </Tabs> */}
          </Card>
        </Col>
        <Col span={6}>
          <KnowledgeBase />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default HomePage;

