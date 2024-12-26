
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Card, Col, Row, Menu, Pagination, Checkbox, Tag, Avatar, Divider, Button, Space, Typography, Select, MenuProps } from 'antd';
import { MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { TicketProvider, useTicketContext } from './context/TicketContext';
import { ProCard } from '@ant-design/pro-components';
import { flatMap } from 'lodash-es';
import { SubMenuType } from 'rc-menu/lib/interface';

interface Ticket {
  id: number;
  status: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  priority: string;
  assignee: string;
  isProcessing: boolean;
}


const { Option } = Select;


const items: MenuProps['items'] = [
  {
    key: 'personal',
    icon: <MailOutlined />,
    label: '个人',
    children: [
      {
        key: 'custom1',
        label: '自定义 1',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'shared',
    icon: <MailOutlined />,
    label: '共享',
    children: [
      {
        key: 'highPriority',
        label: '紧急和高优先级工单',
      },
      {
        key: 'allCopies',
        label: '所有工单的副本',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'default',
    icon: <MailOutlined />,
    label: '默认',
    children: [
      {
        key: 'all',
        label: '所有工单',
      },
      {
        key: 'unresolved',
        label: '所有未解决的工单',
      },
      {
        key: 'undelivered',
        label: '所有未送达消息',
      },
      {
        key: 'mentioned',
        label: '提及我的工单',
      },
      {
        key: 'raisedByMe',
        label: '我提出的工单',
      },
      {
        key: 'watching',
        label: '我正在关注的工单',
      },
      {
        key: 'newAndInProgress',
        label: '新的和我处理中的工单',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'recycleBin',
    icon: <MailOutlined />,
    label: '回收站',
  },
  {
    key: 'spam',
    icon: <MailOutlined />,
    label: '垃圾信息',
  },
];

const TicketList: React.FC = () => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      status: '新建',
      subject: '网络问题',
      content: '无法连接到互联网',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-02',
      priority: '高',
      assignee: '客服A',
      isProcessing: true,
    },
    {
      id: 2,
      status: '处理中',
      subject: '登录问题',
      content: '无法登录账户',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-02',
      priority: '中',
      assignee: '客服B',
      isProcessing: false,
    },
    // 更多工单数据...
  ]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['all']);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);


  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    setSelectedKeys([e.key]);
  };

  const handleSearch = (value: string) => {
    const options = menuItems.filter(item => item.includes(value));
    setSearchOptions(options);
  };

  const handleSelect = (value: string) => {
    console.log('value', value)
    const key = value;
    setSelectedKeys([key]);
    setSearchOptions([])
  };

  const handleCardClick = (id: number) => {
    history.push(`/ticket-manage/freshdesk/ticket-detail?id=${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.includes(searchText) || ticket.content.includes(searchText)
  );

  React.useEffect(() => {;
    setMenuItems(flatMap(items, (item: SubMenuType) => item.children || []));
  }, []);


  return (
    <div className="flex">
      {/* 左侧菜单 */}
      <div className="w-1/4 p-4">
        <ProCard title={
          <Space size={5} align="baseline">
            <Typography.Title level={4}>所有工单</Typography.Title>
            <Button type="primary" size="small" onClick={toggleCollapsed}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Space>
        }>
          <Select
            showSearch
            placeholder="搜索视图"
            onSearch={handleSearch}
            onSelect={handleSelect}
            style={{ width: '100%', marginBottom: 16 }}
            filterOption={false}
          >
            {searchOptions.map(option => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <Menu
            style={{ visibility: searchOptions.length > 0 ? 'hidden' : 'visible' }}
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            defaultOpenKeys={['personal', 'shared', 'default']}
            inlineCollapsed={collapsed}
            items={items}
          />
        </ProCard>
      </div>

      {/* 右侧邮件卡片列表 */}
      <div className="w-3/4 p-4">
        <Row gutter={16}>
          {filteredTickets.map(ticket => (
            <Col span={24} key={ticket.id}>
              <Card
                onClick={() => handleCardClick(ticket.id)}
                className="cursor-pointer"
                style={{ marginBottom: 16 }}
              >
                <Row align="middle">
                  <Col span={1}>
                    <Checkbox />
                  </Col>
                  <Col span={2}>
                    <Avatar icon={<UserOutlined />} />
                  </Col>
                  <Col span={7}>
                    <div>
                      <Tag color={ticket.status === '新建' ? 'blue' : 'green'}>{ticket.status}</Tag>
                    </div>
                    <div>
                      <strong>{ticket.subject}</strong>
                    </div>
                    <div>{ticket.createdAt}</div>
                  </Col>
                  <Col span={7}>
                    <div>
                      <Tag color={ticket.priority === '高' ? 'red' : ticket.priority === '中' ? 'orange' : 'green'}>
                        {ticket.priority}
                      </Tag>
                    </div>
                    <div>{ticket.assignee}</div>
                    <div>{ticket.isProcessing ? '处理中' : '未处理'}</div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 分页器 */}
        <Pagination
          current={currentPage}
          total={filteredTickets.length}
          pageSize={10}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </div>
    </div>
  );
};

export default () => {
  return (
    // <TicketProvider>
      <TicketList />
    // </TicketProvider>
  )
}
