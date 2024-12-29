import React from 'react';
import { Select, message } from 'antd';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';

const { Option } = Select;

interface PriorityManagerProps {
  ticketId: string;
  currentPriority: string;
}

const PriorityManager: React.FC<PriorityManagerProps> = ({ ticketId, currentPriority }) => {
  const handlePriorityChange = (value: string) => {
    // 这里可以添加更新优先级的API调用
    console.log(`Updating priority for ticket ${ticketId} to ${value}`);
    message.success(`工单 ${ticketId} 的优先级已更新为 ${value}`);
  };

  return (
    <ProForm submitter={false}>
      <ProFormSelect
        name="priority"
        label="优先级"
        initialValue={currentPriority}
        options={[
          { value: '低', label: '低' },
          { value: '中', label: '中' },
          { value: '高', label: '高' },
          { value: '紧急', label: '紧急' },
        ]}
        fieldProps={{
          onChange: handlePriorityChange,
        }}
      />
    </ProForm>
  );
};

export default PriorityManager;

