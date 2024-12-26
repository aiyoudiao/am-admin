import React from 'react';
import { history } from '@umijs/max';
import { Card, Tag, Typography, Space, Avatar, Row, Col, Checkbox } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { TicketItem } from './TicketList';

const { Text, Title } = Typography;

interface TicketCardProps {
  ticket: TicketItem;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '处理中':
        return 'processing';
      case '已解决':
        return 'success';
      case '新建':
        return 'default';
      case '已关闭':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case '高':
        return 'red';
      case '中':
        return 'orange';
      case '低':
        return 'green';
      default:
        return 'blue';
    }
  };

  const handleCardClick = (id: string) => {
    history.push(`/ticket-manage/freshdesk/ticket-details?id=${id}`);
  };

  return (
    <>
      <Card
        hoverable
        className="ticket-card mb-1"
        onClick={() => handleCardClick(ticket.id)}
      >
        <Row align="middle">
          <Col span={1}>
            <Checkbox />
          </Col>
          <Col span={2}>
            <Avatar icon={<UserOutlined />} />
          </Col>
          <Col span={14}>
            <div>
              <Tag color={getStatusColor(ticket.status)}>{ticket.status}</Tag>
            </div>
            <div>
              <Space size={4}>
                <strong>{ticket.subject}</strong>
                <Tag>{ticket.id}</Tag>
              </Space>
            </div>
            <div>
              <Space>
                <ClockCircleOutlined />
                <Text>{ticket.createdAt}</Text>
              </Space>
            </div>
          </Col>
          <Col span={7}>
            <div>
              <Tag color={getPriorityColor(ticket.priority)}>优先级: {ticket.priority}</Tag>
            </div>
            <div>
              <Text>处理人: {ticket.assignee}</Text>
            </div>
            <div>{ticket.isProcessing ? '处理中' : '未处理'}</div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TicketCard;

