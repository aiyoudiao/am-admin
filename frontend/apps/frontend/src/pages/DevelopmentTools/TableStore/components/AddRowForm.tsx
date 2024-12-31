import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { putRow } from '@/services/development-tools/table-store';
import { motion } from 'framer-motion';

interface AddRowFormProps {
  tableName: string;
  primaryKey: { name: string; type: string }[];
  definedColumn: { name: string; type: string }[];
  onSuccess: () => void;
}

const AddRowForm: React.FC<AddRowFormProps> = ({ tableName, primaryKey, definedColumn, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const primaryKeyObj = primaryKey.reduce((acc, curr) => {
        acc[curr.name] = values[curr.name];
        return acc;
      }, {} as any);

      const attributeColumnsObj = definedColumn.reduce((acc, curr) => {
        acc[curr.name] = values[curr.name];
        return acc;
      }, {} as any);

      await putRow(tableName, primaryKeyObj, attributeColumnsObj);
      message.success('数据添加成功');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('数据添加失败');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {primaryKey.map(pk => (
          <Form.Item
            key={pk.name}
            name={pk.name}
            label={`${pk.name} (主键)`}
            rules={[{ required: true, message: `请输入 ${pk.name}` }]}
          >
            <Input />
          </Form.Item>
        ))}
        {definedColumn.map(attr => (
          <Form.Item
            key={attr.name}
            name={attr.name}
            label={attr.name}
          >
            <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加数据
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default AddRowForm;

