import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Ticket {
  id: number;
  status: string;
  subject: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  priority: string;
  assignee: string;
  isProcessing: boolean;
}

interface TicketContextProps {
  tickets: Ticket[];
  selectedKeys: string[];
  searchText: string;
  currentPage: number;
  setSelectedKeys: (keys: string[]) => void;
  setSearchText: (text: string) => void;
  setCurrentPage: (page: number) => void;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets] = useState<Ticket[]>([
    {
      id: 1,
      status: '新建',
      subject: '网络问题',
      content: '无法连接到互联网',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-02',
      priority: '高',
      assignee: '客服A',
      isProcessing: true,
    },
    {
      id: 2,
      status: '处理中',
      subject: '登录问题',
      content: '无法登录账户',
      createdAt: '2024-10-01',
      updatedAt: '2024-10-02',
      priority: '中',
      assignee: '客服B',
      isProcessing: false,
    },
    // 更多工单数据...
  ]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['all']);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        selectedKeys,
        searchText,
        currentPage,
        setSelectedKeys,
        setSearchText,
        setCurrentPage,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};

export { TicketProvider, useTicketContext };
