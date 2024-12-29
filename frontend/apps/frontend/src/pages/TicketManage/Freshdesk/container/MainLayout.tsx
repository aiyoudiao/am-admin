import React, { useMemo, useState } from 'react';
import { Layout, Menu, Button, Input, Avatar, MenuProps, Select, Divider, Typography, Space, Dropdown, message } from 'antd';
import { flatMap } from 'lodash-es';
import { SubMenuType } from 'rc-menu/lib/interface';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  PlusOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Link } from '@umijs/max';

import '@/app.css'

const { Header, Sider, Content } = Layout;


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



const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState<string[]>(['all']);
  const [menuItems, setMenuItems] = useState<string[]>([]);
  const [searchOptions, setSearchOptions] = useState<string[]>([]);



  React.useEffect(() => {
    ;
    setMenuItems(flatMap(items, (item: SubMenuType) => item.children || []));
  }, []);

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

  const dropdownOptions = useMemo<MenuProps>(() => ({
    items: [
      { key: 'ticket', label: '工单', icon: <UserOutlined /> },
      {
        key: 'email', label: '电子邮件',
        icon: <UserOutlined />
      },
      {
        key: 'contact', label: '联系人',
        icon: <UserOutlined />
      },
      {
        key: 'company', label: '公司',
        icon: <UserOutlined />
      },
    ],
    onClick: (e) => {
      message.info('Click on menu item.');
      console.log('click', e);
    }
  }), [])

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white p-0 flex items-center justify-between">
        <div className="ml-4 h-16 flex justify-center items-center">
          <Typography.Title className={`!mb-0`} level={5}>所有工单</Typography.Title>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="ml-2 w-16 "
          />
        </div>
        <div className="flex items-center">

          <Dropdown menu={dropdownOptions} trigger={['hover']} className="mr-4">
            <Button icon={<PlusOutlined />} className="px-2">
              <Space>
                新建
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>


          <Input
            placeholder="搜索工单..."
            prefix={<SearchOutlined />}
            className="mr-4"
          />
          <Button type="text" icon={<BellOutlined />} className="mr-4" />
          <Button type="text" icon={<QuestionCircleOutlined />} className="mr-4" />

        </div>
      </Header>

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} className={`bg-white ${collapsed ? 'hidden' : ''} mr-4`}>
          <Select
            showSearch
            placeholder="搜索视图"
            onSearch={handleSearch}
            onSelect={handleSelect}
            className="custom-width mx-2 box-border"
            filterOption={false}
          >
            {searchOptions.map(option => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
          <Divider className="my-4" />
          <Menu
            style={{ visibility: searchOptions.length > 0 ? 'hidden' : 'visible' }}
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            defaultOpenKeys={['personal', 'shared', 'default']}
            inlineCollapsed={collapsed}
            items={items}
          />
        </Sider>

        <Content className="my-4 p-6 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

