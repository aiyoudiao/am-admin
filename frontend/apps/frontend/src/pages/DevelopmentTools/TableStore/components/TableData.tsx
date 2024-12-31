import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { queryTable } from '@/services/development-tools/table-store';
import { motion } from 'framer-motion';

interface TableDataProps {
  tableName: string;
}

const TableData: React.FC<TableDataProps> = ({ tableName }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchColumn, setSearchColumn] = useState('');
  const [searchValue, setSearchValue] = useState('');

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
  }, [tableName]);

  const handleTableChange = (pagination: any) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleSearch = () => {
    fetchData(1, pagination.pageSize);
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
      }))
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
    </motion.div>
  );
};

export default TableData;

