import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Button } from 'antd';

interface SearchFormProps {
  ref: any;
  onSearch: (values: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = forwardRef(({ onSearch }, ref) => {
  const [form] = Form.useForm();

  const handleSearch = (values: any) => {
    onSearch(values);
  };

  useImperativeHandle(ref, () => ({
    resetForm() {
      form.resetFields();
    }
  }))

  return (
    <Form form={form} layout="inline" onFinish={handleSearch}>
      <Form.Item name="name" label="标题">
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="description" label="描述">
        <Input placeholder="请输入描述" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  );
});

export default SearchForm;

