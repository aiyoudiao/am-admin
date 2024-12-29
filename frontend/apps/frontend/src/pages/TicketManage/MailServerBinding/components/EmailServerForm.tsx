import React from 'react';
import { Form, Input, Button } from 'antd';
import { EmailAccount, EmailServer } from '../types';

interface EmailServerFormProps {
  server: EmailServer;
  onSubmit: (values: EmailAccount) => void;
  onCancel: () => void;
}

const EmailServerForm: React.FC<EmailServerFormProps> = ({
  server,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onSubmit({
      ...values,
      serverName: server,
      status: '已连接',
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="姓名"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="电子邮件地址"
        rules={[
          { required: true, message: '请输入电子邮件地址' },
          { type: 'email', message: '请输入有效的电子邮件地址' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Button onClick={onCancel} className="ml-2">
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailServerForm;

