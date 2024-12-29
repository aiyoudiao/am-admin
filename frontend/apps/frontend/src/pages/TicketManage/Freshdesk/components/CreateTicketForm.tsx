import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';

const { Option } = Select;

const CreateTicketForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // 这里可以添加创建工单的逻辑
  };

  return (
    <ProForm
      form={form}
      name="createTicket"
      onFinish={onFinish}
      submitter={{
        render: (props, doms) => {
          return [
            <Button type="primary" key="submit" onClick={() => props.form?.submit()}>
              创建工单
            </Button>,
          ];
        },
      }}
    >
      <ProFormText
        name="subject"
        label="主题"
        rules={[{ required: true, message: '请输入工单主题' }]}
      />
      <ProFormSelect
        name="requester"
        label="请求者"
        rules={[{ required: true, message: '请选择请求者' }]}
        options={[
          { value: '张三', label: '张三' },
          { value: '李四', label: '李四' },
          { value: '王五', label: '王五' },
        ]}
      />
      <ProFormSelect
        name="assignee"
        label="处理人"
        rules={[{ required: true, message: '请选择处理人' }]}
        options={[
          { value: '技术支持A', label: '技术支持A' },
          { value: '技术支持B', label: '技术支持B' },
          { value: '客服C', label: '客服C' },
        ]}
      />
      <ProFormSelect
        name="status"
        label="状态"
        rules={[{ required: true, message: '请选择状态' }]}
        options={[
          { value: '新建', label: '新建' },
          { value: '处理中', label: '处理中' },
          { value: '已解决', label: '已解决' },
          { value: '已关闭', label: '已关闭' },
        ]}
      />
      <ProFormSelect
        name="priority"
        label="优先级"
        rules={[{ required: true, message: '请选择优先级' }]}
        options={[
          { value: '低', label: '低' },
          { value: '中', label: '中' },
          { value: '高', label: '高' },
        ]}
      />
      <ProFormSelect
        name="group"
        label="分组"
        rules={[{ required: true, message: '请选择分组' }]}
        options={[
          { value: '技术支持', label: '技术支持' },
          { value: '客户服务', label: '客户服务' },
          { value: '销售', label: '销售' },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        rules={[{ required: true, message: '请输入工单描述' }]}
      />
    </ProForm>
  );
};

export default CreateTicketForm;

