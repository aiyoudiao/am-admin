import React, { useState } from 'react';
import { Table, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import AddEmailDrawer from './components/AddEmailDrawer';
import { EmailAccount } from './types';

const EmailServerManager: React.FC = () => {
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const columns = [
    {
      title: '所属邮件服务器',
      dataIndex: 'serverName',
      key: 'serverName',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '电子邮件地址',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const handleAddAccount = (newAccount: EmailAccount) => {
    setEmailAccounts([...emailAccounts, newAccount]);
    setIsDrawerVisible(false);
    message.success('邮箱账号添加成功');
  };

  return (
    <PageContainer header={{ title: null }}>
      <ProCard
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsDrawerVisible(true)}
          >
            添加新支持的邮箱
          </Button>
        }
      >
        <Table columns={columns} dataSource={emailAccounts} rowKey="email" />
        <AddEmailDrawer
          open={isDrawerVisible}
          onClose={() => setIsDrawerVisible(false)}
          onAddAccount={handleAddAccount}
        />
      </ProCard>
    </PageContainer>
  );
};

export default EmailServerManager;

