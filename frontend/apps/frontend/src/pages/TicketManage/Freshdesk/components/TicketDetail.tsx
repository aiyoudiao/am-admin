import React, { useState } from 'react';
import { Card, Descriptions, Tag, Timeline, Divider, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import TicketComments from '../pages/TicketDetails/components/TicketComments';
import TagManager from '../pages/TicketDetails/components/TagManager';

interface TicketDetailProps {
  ticket: {
    id: string;
    subject: string;
    requester: string;
    assignee: string;
    status: string;
    priority: string;
    group: string;
    createdAt: string;
    description: string;
    tags: string[];
  };
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  const [tags, setTags] = useState(ticket.tags);

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    // Here you would typically update the ticket in your backend
    console.log('Tags updated:', newTags);
  };

  return (
    <Card title={`工单 ${ticket.id}`} extra={<a href="#">编辑</a>}>
      <Descriptions column={2}>
        <Descriptions.Item label="主题">{ticket.subject}</Descriptions.Item>
        <Descriptions.Item label="请求者">{ticket.requester}</Descriptions.Item>
        <Descriptions.Item label="处理人">{ticket.assignee}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={ticket.status === '已解决' ? 'green' : 'volcano'}>
            {ticket.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="优先级">
          <Tag color={ticket.priority === '高' ? 'red' : ticket.priority === '中' ? 'orange' : 'green'}>
            {ticket.priority}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="分组">{ticket.group}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{ticket.createdAt}</Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">标签</Divider>
      <TagManager tags={tags} onTagsChange={handleTagsChange} />
      <Card type="inner" title="工单描述" className="mt-4">
        <p>{ticket.description}</p>
      </Card>
      <Card type="inner" title="工单历史" className="mt-4">
        <Timeline>
          <Timeline.Item>创建工单 2023-04-01 10:00:00</Timeline.Item>
          <Timeline.Item>分配给李四 2023-04-01 10:05:00</Timeline.Item>
          <Timeline.Item>
            <p>李四回复：正在处理中，请稍等</p>
            <p>2023-04-01 10:30:00</p>
          </Timeline.Item>
          <Timeline.Item
            dot={<ClockCircleOutlined className="text-blue-500" />}
            color="blue"
          >
            等待客户回复 2023-04-01 11:00:00
          </Timeline.Item>
        </Timeline>
      </Card>
      <Divider />
      <Card type="inner" title="工单评论" className="mt-4">
        <TicketComments />
      </Card>
    </Card>
  );
};

export default TicketDetail;
