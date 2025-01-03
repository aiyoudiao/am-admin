import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { updateRow } from '@/services/development-tools/table-store';

interface EditRowFormProps {
  tableName: string;
  record: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditRowForm: React.FC<EditRowFormProps> = ({ tableName, record, tableInfo, onSuccess, onCancel }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {

    const primaryKey = Object.values(tableInfo.primaryKey).reduce((acc, cur) => {
      const name = cur.name;
      acc[name] = record[name];
      return acc;
    }, {} as any);

    const attributeColumns = Object.values(tableInfo.definedColumn || []).reduce((acc, cur) => {
      const name = cur.name;
      acc[name] = record[name];
      return acc;
    }, {} as any);

    form.setFieldsValue({
      ...primaryKey,
      ...attributeColumns,
    });
  }, [record, tableInfo, form]);

  const handleSubmit = async (values: any) => {
    try {

      const primaryKey = Object.values(tableInfo.primaryKey).reduce((acc, cur) => {
        const name = cur.name;
        acc[name] = values[name];
        return acc;
      }, {} as any);

      const attributeColumns = Object.values(tableInfo.definedColumn || []).reduce((acc, cur) => {
        const name = cur.name;
        acc[name] = values[name];
        return acc;
      }, {} as any);

      await updateRow(tableName, primaryKey, attributeColumns);
      message.success('数据更新成功');
      onSuccess();
    } catch (error) {
      message.error('数据更新失败');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      {Object.entries(tableInfo.primaryKey).map(([key, value]) => (
        <Form.Item
          key={value.name}
          name={value.name}
          label={`${value.name} (主键)`}
          rules={[{ required: true, message: `请输入 ${value.name}` }]}
        >
          <Input disabled />
        </Form.Item>
      ))}
      {Object.entries(tableInfo.definedColumn || []).map(([key, value]) => (
        <Form.Item
          key={value.name}
          name={value.name}
          label={value.name}
          rules={[{ required: true, message: `请输入 ${value.name}` }]}
        >
          <Input />
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRowForm;

