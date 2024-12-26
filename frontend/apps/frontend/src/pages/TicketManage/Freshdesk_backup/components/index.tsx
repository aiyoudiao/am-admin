import { HeartTwoTone, LaptopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined, SmileTwoTone, UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';

import { Alert, Breadcrumb, Button, Card, Layout, Menu, MenuProps, Typography, theme } from 'antd';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);
const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <PageContainer header={{ title: null }}>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }} trigger={null} collapsible collapsed={collapsed}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 6px 6px' }}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Card>
              <Alert
                message={'更快更强的重型组件，已经发布。'}
                type="success"
                showIcon
                banner
                style={{
                  margin: -12,
                  marginBottom: 48,
                }}
              />
              <Typography.Title
                level={2}
                style={{
                  textAlign: 'center',
                }}
              >
                <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
              </Typography.Title>
            </Card>
            <p
              style={{
                textAlign: 'center',
                marginTop: 24,
              }}
            >
              Want to add more pages? Please refer to{' '}
              <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
                use block
              </a>
              。
            </p>
          </Content>
        </Layout>
      </Layout>
    </PageContainer>
  );
};
export default Admin;
