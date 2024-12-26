import React, { useState } from 'react';
import { Tabs, Card, Row, Col } from 'antd';
import MainLayout from './container/MainLayout';
import TicketList from './components/TicketList';
import TicketDetail from './components/TicketDetail';
import CreateTicketForm from './components/CreateTicketForm';
import Dashboard from './container/Dashboard';
import PriorityManager from './components/PriorityManager';
import AssignTicket from './components/AssignTicket';
import KnowledgeBase from './components/KnowledgeBase';

const { TabPane } = Tabs;

const HomePage: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const dummyTicket = {
    id: '#1001',
    subject: '无法登录系统',
    requester: '张三',
    assignee: '李四',
    status: '处理中',
    priority: '高',
    group: '技术支持',
    createdAt: '2023-04-01 10:00:00',
    description: '用户反馈无法使用常用密码登录系统，疑似账号被锁定或密码过期。',
    tags: ['登录问题', '账户安全'],
  };

  const agents = [
    { id: '1', name: '李四' },
    { id: '2', name: '王五' },
    { id: '3', name: '赵六' },
  ];

  const handleAssign = (agentId: string) => {
    console.log(`Assigning ticket ${dummyTicket.id} to agent ${agentId}`);
    // Here you would typically update the ticket in your backend
  };

  return (
    <MainLayout>
        <Dashboard />
        <Row gutter={16} className="mt-4">
          <Col span={18}>
            <Card>
              <Tabs activeKey={activeKey} onChange={setActiveKey}>
                <TabPane tab="工单列表" key="1">
                  <TicketList />
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
              </Tabs>
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

