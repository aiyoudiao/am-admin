import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Tabs, message, Typography, Space } from 'antd';
import TableList from './components/TableList';
import TableDetail from './components/TableDetail';
import AddRowForm from './components/AddRowForm';

import TableData from './components/TableData';
import { useSearchParams, history } from '@umijs/max';
import { listTables, describeTable } from '@/services/development-tools/table-store';
import { motion } from 'framer-motion';
import { DoubleLeftOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title } = Typography;

const TableStorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tableName = searchParams.get('tableName');
  const [tables, setTables] = useState<string[]>([]);
  const [tableInfo, setTableInfo] = useState<any>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    fetchTables();
  }, []);

  useEffect(() => {
    if (tableName) {
      fetchTableInfo(tableName);
    }
  }, [tableName]);

  const fetchTables = async () => {
    try {
      const response = await listTables();
      setTables(response.data);
    } catch (error) {
      message.success('获取表格数据失败');
    }
  };

  const fetchTableInfo = async (name: string) => {
    try {
      const response = await describeTable(name);
      setTableInfo(response.data.tableMeta);
    } catch (error) {
      message.success('获取表格结构数据失败');
    }
  };
  return (
    <PageContainer header={{
      title: <Space align="baseline">
        <Title level={4}>{tableName ? `阿里云 TableStore：${tableName}` : '阿里云 TableStore'}</Title>
        {tableName &&
          <Button
            color="primary"
            icon={<DoubleLeftOutlined />}
            variant="outlined"
            onClick={() => history.push('/development-tools/table-store')}
          />}
      </Space>
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tableName ? (
          <Tabs defaultActiveKey="1">
            <TabPane tab="表格详情" key="1">
              <TableDetail tableName={tableName} tableInfo={tableInfo} />
            </TabPane>
            <TabPane tab="表格数据" key="2">
              <TableData tableName={tableName} tableInfo={tableInfo} now={now} />
            </TabPane>
            <TabPane tab="添加数据" key="3">
              <AddRowForm
                tableName={tableName}
                primaryKey={tableInfo?.primaryKey || []}
                definedColumn={tableInfo?.definedColumn || []}
                onSuccess={() => {
                  setNow(Date.now());
                }}
              />
            </TabPane>
          </Tabs>
        ) : (
          <TableList tables={tables} onRefresh={fetchTables} />
        )}
      </motion.div>
    </PageContainer>
  );
};

export default TableStorePage;

