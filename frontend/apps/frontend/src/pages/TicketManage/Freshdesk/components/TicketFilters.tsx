import React from 'react';
import { Form, Select, Space, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Option } = Select;

interface TicketFiltersProps {
  onFiltersChange: (values: any) => void;
}

const TicketFilters: React.FC<TicketFiltersProps> = ({ onFiltersChange }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onFiltersChange({});
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(_, allValues) => onFiltersChange(allValues)}
    >
      <Space direction="vertical" className="w-full">
        <Form.Item name="assignee" label="处理人名单">
          <Select placeholder="任意处理人">
            <Option value="any">任意处理人</Option>
            <Option value="zhangsan">张三</Option>
            <Option value="lisi">李四</Option>
          </Select>
        </Form.Item>

        <Form.Item name="group" label="群组名单">
          <Select placeholder="任意群组">
            <Option value="any">任意群组</Option>
            <Option value="tech">技术支持</Option>
            <Option value="service">客服</Option>
          </Select>
        </Form.Item>

        <Form.Item name="createdTime" label="已创建">
          <Select placeholder="过去 30 天">
            <Option value="30">过去 30 天</Option>
            <Option value="60">过去 60 天</Option>
            <Option value="90">过去 90 天</Option>
          </Select>
        </Form.Item>

        <Form.Item name="dueTime" label="关闭于">
          <Select placeholder="所有时间">
            <Option value="all">所有时间</Option>
            <Option value="today">今天</Option>
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
          </Select>
        </Form.Item>

        <Form.Item name="resolvedTime" label="解决于">
          <Select placeholder="所有时间">
            <Option value="all">所有时间</Option>
            <Option value="today">今天</Option>
            <Option value="week">本周</Option>
            <Option value="month">本月</Option>
          </Select>
        </Form.Item>

        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => onFiltersChange(form.getFieldsValue())}
          block
        >
          应用筛选
        </Button>
        <Button onClick={handleReset} block>
          重置
        </Button>
      </Space>
    </Form>
  );
};

export default TicketFilters;

