import React from 'react';
import { Table, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { motion } from 'framer-motion';

interface TableListProps {
  tables: string[];
  onRefresh: () => void;
}

const TableList: React.FC<TableListProps> = ({ tables, onRefresh }) => {
  const columns = [
    {
      title: '表格名称',
      dataIndex: 'tableName',
      key: 'tableName',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: string) => (
        <Button type="link" onClick={() => handleViewDetails(record.tableName)}>
          查看详情
        </Button>
      ),
    },
  ];

  const handleViewDetails = (tableName: string) => {
    history.push(`/development-tools/table-store?tableName=${tableName}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProTable
        headerTitle="TableStore 表格列表"
        columns={columns}
        dataSource={tables.map(tableName => ({ tableName }))}
        rowKey="tableName"
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="refresh" onClick={onRefresh}>刷新</Button>,
          <Button key="create" icon={<PlusOutlined />} type="primary">
            新建表格
          </Button>,
        ]}
      />
    </motion.div>
  );
};

export default TableList;

