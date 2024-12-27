import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import type { ProFormSelectProps } from '@ant-design/pro-components';

interface FilterFormProps {
  onSubmit?: (values: any) => void;
  loading?: boolean;
}

const FilterForm: React.FC<FilterFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  // 通用的选择器属性
  const commonSelectProps: ProFormSelectProps = {
    allowClear: true,
  };

  // 处理人选项
  const processorOptions = [
    { label: '任意处理人', value: 'any' },
    { label: '客服组 - 张三', value: 'zhangsan' },
    { label: '客服组 - 李四', value: 'lisi' },
    { label: '退款组 - 王五', value: 'wangwu' },
    { label: '物流组 - 赵六', value: 'zhaoliu' },
  ];

  // 群组选项
  const groupOptions = [
    { label: '任意群组', value: 'any' },
    { label: '客服组', value: 'customer_service' },
    { label: '退款处理组', value: 'refund' },
    { label: '物流跟进组', value: 'logistics' },
    { label: '商品质量组', value: 'quality' },
    { label: '投诉处理组', value: 'complaint' },
  ];

  // 时间选项
  const timeOptions = [
    { label: '过去 24 小时', value: '24h' },
    { label: '过去 7 天', value: '7d' },
    { label: '过去 30 天', value: '30d' },
    { label: '过去 90 天', value: '90d' },
    { label: '所有时间', value: 'all' },
  ];

  // 状态选项
  const statusOptions = [
    { label: '任意状态', value: 'any' },
    { label: '待处理', value: 'pending' },
    { label: '处理中', value: 'processing' },
    { label: '等待客户回复', value: 'waiting_customer' },
    { label: '等待商家回复', value: 'waiting_merchant' },
    { label: '已解决', value: 'resolved' },
    { label: '已关闭', value: 'closed' },
  ];

  // 优先级选项
  const priorityOptions = [
    { label: '任何', value: 'any' },
    { label: '低', value: 'low' },
    { label: '中', value: 'medium' },
    { label: '高', value: 'high' },
    { label: '紧急', value: 'urgent' },
  ];

  // 类型选项
  const typeOptions = [
    { label: '任何', value: 'any' },
    { label: '订单问题', value: 'order' },
    { label: '退款申请', value: 'refund' },
    { label: '物流查询', value: 'logistics' },
    { label: '商品咨询', value: 'product' },
    { label: '售后服务', value: 'after_sale' },
    { label: '账户问题', value: 'account' },
    { label: '投诉建议', value: 'complaint' },
  ];

  // 来源选项
  const sourceOptions = [
    { label: '任何', value: 'any' },
    { label: '邮件', value: 'email' },
    { label: '在线客服', value: 'online' },
    { label: '电话', value: 'phone' },
    { label: '社交媒体', value: 'social' },
  ];

  // 标签选项
  const tagOptions = [
    { label: '任何', value: 'any' },
    { label: 'VIP客户', value: 'vip' },
    { label: '重要订单', value: 'important' },
    { label: '需要跟进', value: 'follow_up' },
    { label: '特殊处理', value: 'special' },
  ];

  // 公司选项
  const companyOptions = [
    { label: '任何', value: 'any' },
    { label: '自营店铺', value: 'self' },
    { label: '认证商家', value: 'certified' },
    { label: '普通商家', value: 'normal' },
  ];

  return (
    <div className="bg-white flex flex-col h-full">
      {/* <div className="mb-4">
        <div className="mb-2">过滤</div>
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="搜索字段"
          className="w-full"
          allowClear
        />
      </div> */}

      <div className="flex-1 overflow-auto">
        <ProForm
          submitter={{
            render: ({ form }) => (
              <Button
                type="primary"
                onClick={() => {
                  form?.submit();
                }}
                loading={loading}
                className="w-full mt-4 bg-gray-400 hover:bg-gray-500 border-none"
              >
                应用
              </Button>
            ),
          }}
          onFinish={async (values) => {
            onSubmit?.(values);
            return true;
          }}
        >
          <section className="h-[40rem] overflow-y-auto pr-4">
            <ProFormSelect
              name="processor"
              label="处理人包含"
              options={processorOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="group"
              label="群组包含"
              options={groupOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="created"
              label="已创建"
              options={timeOptions}
              initialValue="30d"
              {...commonSelectProps}
            />

            <ProFormSelect
              name="about"
              label="关于于"
              options={timeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="resolved"
              label="解决于"
              options={timeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="resolveDeadline"
              label="解决截止时间"
              options={timeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="firstResponseDue"
              label="首次回应到期期限"
              options={timeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="nextResponseDue"
              label="下次回应到期于"
              options={timeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="status"
              label="状态包含"
              options={statusOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="priority"
              label="优先级包含"
              options={priorityOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="type"
              label="类型包含"
              options={typeOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="source"
              label="来源包含"
              options={sourceOptions}
              {...commonSelectProps}
            />

            <ProFormSelect
              name="tags"
              label="标签"
              options={tagOptions}
              mode="multiple"
              {...commonSelectProps}
            />

            <ProFormSelect
              name="company"
              label="公司包含"
              options={companyOptions}
              {...commonSelectProps}
            />

          </section>
        </ProForm>
      </div>
    </div>
  );
};

export default FilterForm;

