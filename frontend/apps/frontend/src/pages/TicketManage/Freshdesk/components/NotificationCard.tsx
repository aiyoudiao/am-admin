import { useState } from 'react';
import { Checkbox, Tag, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { EllipsisOutlined } from '@ant-design/icons';

interface NotificationCardProps {
  id: string;
  title: string;
  sender: string;
  createdAt: string;
  isNew?: boolean;
  agent?: 'blank' | 'white' | 'yellow';
  priority?: 'low' | 'medium' | 'high';
  status?: string;
  selected?: boolean;
  onSelect?: (checked: boolean) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  title,
  sender,
  createdAt,
  isNew = false,
  agent= 'blank',
  priority = 'low',
  status = 'processing',
  selected = false,
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleSelect = (checked: boolean) => {
    setIsSelected(checked);
    onSelect?.(checked);
  };

  const agentItems: MenuProps['items'] = [
    { key: 'blank', label: '小黑' },
    { key: 'white', label: '小白' },
    { key: 'yellow', label: '小黄' },
  ];
  const priorityItems: MenuProps['items'] = [
    { key: 'low', label: '低' },
    { key: 'medium', label: '中' },
    { key: 'high', label: '高' },
  ];

  const statusItems: MenuProps['items'] = [
    { key: 'processing', label: '处理中' },
    { key: 'completed', label: '已完成' },
    { key: 'pending', label: '待处理' },
  ];

  return (
    <ProCard
      bordered
      className="mb-2 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={isSelected}
          onChange={(e) => handleSelect(e.target.checked)}
          className="ml-2"
        />

        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
          {sender.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            {isNew && (
              <Tag color="success" className="mr-2">
                新的
              </Tag>
            )}
            <span className="block font-medium">{title}</span>
          </div>

          <div className="text-gray-500 text-sm mt-1">
            {sender} · {createdAt}
          </div>
        </div>

        <div className="flex flex-column items-baseline space-x-4">
          <Dropdown menu={{ items: priorityItems }} placement="bottomRight">
            <Tag color="default" className="cursor-pointer">
              {priorityItems.find(item => item?.key === priority)?.label || '低'}
              <EllipsisOutlined className="ml-1" />
            </Tag>
          </Dropdown>
          <Dropdown menu={{ items: agentItems }} placement="bottomRight">
            <Tag color="default" className="cursor-pointer">
              {agentItems.find(item => item?.key === agent)?.label || '未分配'}
              <EllipsisOutlined className="ml-1" />
            </Tag>
          </Dropdown>

          <Dropdown menu={{ items: statusItems }} placement="bottomRight">
            <Tag color="processing" className="cursor-pointer">
              {statusItems.find(item => item?.key === status)?.label || '待处理'}
              <EllipsisOutlined className="ml-1" />
            </Tag>
          </Dropdown>
        </div>
      </div>
    </ProCard>
  );
};

export default NotificationCard;

