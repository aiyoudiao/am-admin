import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Table, Button, Modal, Form, Input, message, Card, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import * as elasticsearchApi from '@/services/development-tools/elasticsearch';

import SearchForm from './components/SearchForm';

const ElasticsearchCrud: React.FC = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const ref = useRef<{ resetForm: () => void }>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => { setTimeout(resolve, 1000) });
      const { data } = await elasticsearchApi.fetchAll('my_index');
      setData(data);
    } catch (error) {
      message.error('获取数据失败');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (searchParams = {}) => {
    try {
      setLoading(true);
      const { data } = await elasticsearchApi.searchDocuments('my_index', searchParams);
      setData(data);
    } catch (error) {
      message.error('查询数据失败');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      setLoading(true);
      await elasticsearchApi.createDocument('my_index', values);
      message.success('创建成功');
      setIsModalVisible(false);
      ref.current?.resetForm();
      await fetchData();
    } catch (error) {
      message.error('创建项目失败');
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    if (editingId === null) {
      return;
    }

    try {
      setLoading(true);
      await elasticsearchApi.updateDocument('my_index', editingId, values);
      message.success('更新成功');
      setIsModalVisible(false);
      setEditingId(null);
      ref.current?.resetForm();
      await fetchData();
    } catch (error) {
      message.error('更新项目失败');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await elasticsearchApi.deleteDocument('my_index', id);
      message.success('删除成功');
      ref.current?.resetForm();
      await fetchData();
    } catch (error) {
      message.error('删除项目失败');
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '标题', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size={8}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              form.setFieldsValue(record);
              setEditingId(record.id);
              setIsModalVisible(true);
            }}
            disabled={loading}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            disabled={loading}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer header={{ title: null }}>

      <Card>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <section className="mb-4 flex justify-between flex-row">
            <SearchForm onSearch={handleSearch} ref={ref} />

            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                form.resetFields();
                setEditingId(null);
                setIsModalVisible(true);
              }}
              disabled={loading}
            >
              添加新项
            </Button>
          </section>

          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
          />
        </motion.div>

        <Modal
          title={editingId ? "编辑项目" : "添加新项目"}
          open={isModalVisible}
          onOk={() => form.submit()}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loading}
        >
          <Form
            form={form}
            onFinish={editingId ? handleUpdate : handleCreate}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="标题"
              rules={[{ required: true, message: '请输入标题！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="描述"
              rules={[
                { required: true, message: '请输入描述！' },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </PageContainer>
  );
};

export default ElasticsearchCrud;

