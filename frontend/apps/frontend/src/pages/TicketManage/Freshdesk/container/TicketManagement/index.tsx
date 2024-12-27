import React, { useState } from 'react';
import { Space, Select, Button, Tag, Avatar } from 'antd';
import { TableOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const { Option } = Select;

interface TicketItem {
  key: string;
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  createdAt: string;
  dueDate: string;
}

const TicketManagement: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [sortField, setSortField] = useState<string>('createdAt');

  const columns: ProColumns<TicketItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        all: { text: '全部' },
        processing: { text: '处理中', status: 'Processing' },
        resolved: { text: '已解决', status: 'Success' },
        closed: { text: '已关闭', status: 'Default' },
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      valueEnum: {
        low: { text: '低', status: 'Default' },
        medium: { text: '中', status: 'Warning' },
        high: { text: '高', status: 'Error' },
      },
    },
    {
      title: '处理人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '到期时间',
      dataIndex: 'dueDate',
      key: 'dueDate',
      valueType: 'dateTime',
    },
  ];

  const sortOptions = [
    { label: '创建日期', value: 'createdAt' },
    { label: '到期时间', value: 'dueDate' },
    { label: '优先级', value: 'priority' },
    { label: '状态', value: 'status' },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <ProTable<TicketItem>
      headerTitle="工单列表"
      rowSelection={rowSelection}
      columns={columns}
      cardProps={viewMode === 'card' ? {
        bodyStyle: { padding: 0 },
      } : undefined}
      cardActionProps="actions"
      type={viewMode === 'card' ? 'card' : 'table'}
      rowKey="key"
      search={{
        labelWidth: 'auto',
        filterType: 'light',
      }}
      toolbar={{
        menu: {
          type: 'tab',
          items: [
            {
              key: 'all',
              label: '全部工单',
            },
            {
              key: 'processing',
              label: '处理中',
            },
            {
              key: 'resolved',
              label: '已解决',
            },
          ],
        },
        actions: [
          <Space key="actions">
            <Select
              defaultValue="createdAt"
              style={{ width: 120 }}
              onChange={(value) => setSortField(value)}
            >
              {sortOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Button.Group>
              <Button
                icon={<TableOutlined />}
                type={viewMode === 'table' ? 'primary' : 'default'}
                onClick={() => setViewMode('table')}
              />
              <Button
                icon={<AppstoreOutlined />}
                type={viewMode === 'card' ? 'primary' : 'default'}
                onClick={() => setViewMode('card')}
              />
            </Button.Group>
          </Space>
        ],
      }}
      request={async (params, sorter, filter) => {
        // 这里模拟API请求
        return {
          data: [
            {
              key: '1',
              id: '#1001',
              title: '系统登录问题',
              status: 'processing',
              priority: 'high',
              assignee: '张三',
              createdAt: '2024-01-26 10:00:00',
              dueDate: '2024-01-27 10:00:00',
            },
            {
              key: '2',
              id: '#1002',
              title: '订单退款问题',
              status: 'resolved',
              priority: 'medium',
              assignee: '李四',
              createdAt: '2024-01-26 11:00:00',
              dueDate: '2024-01-27 11:00:00',
            },
            // 更多数据...
          ],
          success: true,
          total: 1695733,
        };
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        total: 1695733,
        defaultPageSize: 30,
        showTotal: (total) => `1-30 / ${total}`,
      }}
      // 卡片模式的自定义渲染
      cardRender={(item) => {
        return (
          <div className="p-4 border-b last:border-b-0">
            <Space direction="vertical" className="w-full">
              <Space className="w-full justify-between">
                <Tag>{item.id}</Tag>
                <Tag color={item.status === 'resolved' ? 'success' : 'processing'}>
                  {item.status === 'resolved' ? '已解决' : '处理中'}
                </Tag>
              </Space>
              <div className="text-lg font-medium">{item.title}</div>
              <Space className="w-full justify-between">
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} />
                  <span>{item.assignee}</span>
                </Space>
                <Tag color={item.priority === 'high' ? 'red' : 'orange'}>
                  {item.priority === 'high' ? '高优先级' : '中优先级'}
                </Tag>
              </Space>
              <Space className="w-full justify-between text-gray-500 text-sm">
                <span>创建: {item.createdAt}</span>
                <span>到期: {item.dueDate}</span>
              </Space>
            </Space>
          </div>
        );
      }}
    />
  );
};

export default TicketManagement;

