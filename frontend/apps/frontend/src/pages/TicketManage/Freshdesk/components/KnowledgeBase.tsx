import React from 'react';
import { List, Card, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FilterForm from './FilterForm';

const { Search } = Input;

interface Article {
  id: string;
  title: string;
  description: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: '如何重置密码',
    description: '本文介绍了重置账户密码的步骤...',
  },
  {
    id: '2',
    title: '常见登录问题解决方案',
    description: '解决用户无法登录系统的常见问题...',
  },
  {
    id: '3',
    title: '如何提交工单',
    description: '详细说明了提交工单的流程和注意事项...',
  },
];

const KnowledgeBase: React.FC = () => {
  return (
    <Card>
      <FilterForm />
      {/* <Search
        placeholder="搜索文章"
        enterButton={<SearchOutlined />}
        style={{ marginBottom: 20 }}
      />
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<a href={`/article/${item.id}`}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      /> */}
    </Card>
  );
};

export default KnowledgeBase;

