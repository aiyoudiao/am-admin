import React, { useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { GoogleOutlined, WindowsOutlined } from '@ant-design/icons';
import EmailServerForm from './EmailServerForm';
import { EmailAccount, EmailServer } from '../types';

interface AddEmailDrawerProps {
  open: boolean;
  onClose: () => void;
  onAddAccount: (account: EmailAccount) => void;
}

const AddEmailDrawer: React.FC<AddEmailDrawerProps> = ({
  open,
  onClose,
  onAddAccount,
}) => {
  const [selectedServer, setSelectedServer] = useState<EmailServer | null>(null);

  const handleServerSelect = (server: EmailServer) => {
    setSelectedServer(server);
  };

  const handleFormSubmit = (values: EmailAccount) => {
    onAddAccount(values);
    setSelectedServer(null);
  };

  return (
    <Drawer
      title="添加新支持的邮箱"
      placement="right"
      onClose={onClose}
      open={open}
      width={520}
    >
      {!selectedServer ? (
        <Space direction="vertical" size="large" className="w-full">
          <Button
            icon={<GoogleOutlined />}
            onClick={() => handleServerSelect('Google')}
            block
          >
            绑定 Google 邮箱
          </Button>
          <Button
            icon={<WindowsOutlined />}
            onClick={() => handleServerSelect('Microsoft')}
            block
          >
            绑定 Microsoft 邮箱
          </Button>
          <Button onClick={() => handleServerSelect('Freshdesk')} block>
            绑定 Freshdesk 邮箱
          </Button>
        </Space>
      ) : (
        <EmailServerForm
          server={selectedServer}
          onSubmit={handleFormSubmit}
          onCancel={() => setSelectedServer(null)}
        />
      )}
    </Drawer>
  );
};

export default AddEmailDrawer;

