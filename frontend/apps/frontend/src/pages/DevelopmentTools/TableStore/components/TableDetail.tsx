import React from 'react';
import { Card, Table } from 'antd';
import { motion } from 'framer-motion';

interface TableDetailProps {
  tableName: string;
  tableInfo: any;
}

const TableDetail: React.FC<TableDetailProps> = ({ tableName, tableInfo }) => {
  const columns = [
    {
      title: '列名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '主键',
      key: 'isPrimaryKey',
      render: (_: any, record: any) =>
        tableInfo?.primaryKey.some((pk: any) => pk.name === record.name) ? '是' : '否',
    },
  ];

  const dataSource = [
    ...(tableInfo?.primaryKey || []),
    ...(tableInfo?.definedColumn || []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card title={`表格详情: ${tableName}`}>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="name"
        />
      </Card>
    </motion.div>
  );
};

export default TableDetail;

