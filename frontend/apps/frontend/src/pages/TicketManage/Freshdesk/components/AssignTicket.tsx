import React from 'react';
import { Select, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

interface AssignTicketProps {
  ticketId: string;
  currentAssignee: string;
  agents: { id: string; name: string }[];
  onAssign: (agentId: string) => void;
}

const AssignTicket: React.FC<AssignTicketProps> = ({ ticketId, currentAssignee, agents, onAssign }) => {
  const handleAssign = (value: string) => {
    onAssign(value);
    message.success(`工单 ${ticketId} 已分配给 ${agents.find(agent => agent.id === value)?.name}`);
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="选择处理人"
      onChange={handleAssign}
      value={currentAssignee}
    >
      {agents.map(agent => (
        <Option key={agent.id} value={agent.id}>
          <UserOutlined /> {agent.name}
        </Option>
      ))}
    </Select>
  );
};

export default AssignTicket;

