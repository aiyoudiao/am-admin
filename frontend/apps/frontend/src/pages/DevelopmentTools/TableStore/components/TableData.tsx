import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message, Popconfirm, Modal, Drawer, Space } from 'antd';
import { motion } from 'framer-motion';
import { SearchOutlined, DeleteOutlined, EditOutlined, JavaScriptOutlined } from '@ant-design/icons';
import { queryTable, deleteRow } from '@/services/development-tools/table-store';
import EditRowForm from './EditRowForm';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

interface TableDataProps {
  tableName: string;
}

const TableData: React.FC<TableDataProps> = ({ tableName, tableInfo, now }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [editingRecord, setEditingRecord] = useState<any | null>(null);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any | null>(null);

  const { copy } = useCopyToClipboard()

  const fetchData = async (page = 1, pageSize = 1000) => {
    setLoading(true);
    try {
      const response = await queryTable(tableName, {
        offset: (page - 1) * pageSize,
        limit: pageSize,
        columnToQuery: searchColumn,
        queryValue: searchValue,
      });
      setData(response.data.rows);
      setPagination({
        ...pagination,
        current: page,
        pageSize,
        total: response.data.total,
      });
    } catch (error) {
      message.error('Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tableName, now]);

  const handleTableChange = (pagination: any) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleSearch = () => {
    fetchData(1, pagination.pageSize);
  };

  const handleDeleteRow = async (record: any) => {
    try {
      const primaryKey = Object.values(tableInfo.primaryKey).reduce((acc, cur) => {
        const name = cur.name;
        acc[name] = record[name];
        return acc;
      }, {} as any);
      await deleteRow(tableName, primaryKey);
      message.success('行数据删除成功');
      await fetchData();
    } catch (error) {
      message.success('行数据删除失败');
    }
  };


  const handleEditRow = (record: any) => {
    setEditingRecord(record);
  };

  const handleEditSuccess = () => {
    setEditingRecord(null);
    fetchData();
  };

  const handleEditCancel = () => {
    setEditingRecord(null);
  };

  const handleRowClick = (record: any) => {
    setSelectedRowData(record);
    setDrawerVisible(true);
  };

  const columns = data.length > 0
    ? Object.keys(data[0]).map(key => ({
      title: key,
      dataIndex: key,
      key: key,
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${key}`}
            value={searchColumn === key ? searchValue : ''}
            onChange={e => {
              setSearchColumn(key);
              setSearchValue(e.target.value);
            }}
            onPressEnter={handleSearch}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={handleSearch}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
    })).concat({
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_, record: any) => (
        <>
          <Button type="link" icon={<JavaScriptOutlined />} onClick={() => handleRowClick(record)}>数据预览</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditRow(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这行数据吗?"
            onConfirm={() => handleDeleteRow(record)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </>

      ),
    })
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />
      <Modal
        title="编辑数据"
        open={!!editingRecord}
        onCancel={handleEditCancel}
        footer={null}
      >
        {editingRecord && tableName && (
          <EditRowForm
            tableName={tableName}
            record={editingRecord}
            tableInfo={tableInfo}
            onSuccess={handleEditSuccess}
            onCancel={handleEditCancel}
          />
        )}
      </Modal>

      <Drawer
        title="行数据 JSON data"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={500}
      >
        <Space size={8} direction="vertical" style={{ width: '100%' }}>
          {selectedRowData && (
            <Input.TextArea
              value={JSON.stringify(selectedRowData, null, 4)}
              autoSize={{ minRows: 10 }}
              readOnly
            />
          )}
          <Button type="primary" onClick={() => {
            copy(JSON.stringify(selectedRowData, null, 4), false);
            message.success('JSON 数据已复制到粘贴板');
          }}>复制</Button>
        </Space>
      </Drawer>
    </motion.div>
  );
};

export default TableData;

