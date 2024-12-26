import React, { useState } from 'react';
import { useSearchParams } from 'umi';
import { Card, Col, Row, Menu, Modal, Input, Button, Descriptions, Divider, Select, Upload, message, List, Form } from 'antd';
import { MailOutlined, InfoCircleOutlined, CloseCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';

// 假设的工单数据
const ticketDetail = {
  id: 1,
  subject: '网络问题',
  status: '新建',
  type: '技术支持',
  content: '无法连接到互联网',
  attachments: ['附件1.png', '附件2.jpg'],
  replies: ['请描述具体问题。', '已尝试重启路由器。'],
  notes: ['客户为VIP用户'],
  createdAt: '2024-10-01',
  updatedAt: '2024-10-02',
  closedAt: '2024-10-03',
  closedBy: '管理员',
  closeReason: '问题解决',
};

const FreshdeskTicketDetails: React.FC = () => {
  // 使用 useSearchParams 获取查询参数
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // 从查询参数获取工单ID

  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState(ticketDetail.status);
  const [closeReason, setCloseReason] = useState(ticketDetail.closeReason);
  const [fileList, setFileList] = useState(ticketDetail.attachments);
  const [newReply, setNewReply] = useState('');
  const [updatedReplies, setUpdatedReplies] = useState(ticketDetail.replies);
  const [ticketLog, setTicketLog] = useState([
    {
      timestamp: '2024-10-01 12:00',
      action: '工单创建',
      description: '客户提交了工单，问题描述为“无法连接到互联网”',
      operator: '系统',
    },
    {
      timestamp: '2024-10-02 10:00',
      action: '状态更新',
      description: '将工单状态更新为“处理中”',
      operator: '管理员',
    },
    {
      timestamp: '2024-10-02 12:00',
      action: '回复新增',
      description: '添加了回复：“已尝试重启路由器。”',
      operator: '技术支持',
    },
    {
      timestamp: '2024-10-02 15:00',
      action: '附件上传',
      description: '上传了附件“附件1.png”',
      operator: '客户',
    },
  ]);

  const statuses = ['新建', '处理中', '已解决', '已关闭'];
  const types = ['技术支持', '销售', '其他'];
  const groups = ['技术组', '销售组', '客服组'];
  const agents = ['客服A', '客服B', '客服C'];
  const priorities = ['低', '中', '高', '紧急'];

  // 显示状态更新对话框
  const showStatusModal = () => {
    setIsStatusModalVisible(true);
  };

  // 关闭状态更新对话框
  const handleStatusCancel = () => {
    setIsStatusModalVisible(false);
  };

  // 更新工单状态并记录日志
  const handleStatusChange = () => {
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      action: '状态更新',
      description: `将工单状态更新为“${newStatus}”`,
      operator: '管理员',
    };
    setTicketLog([...ticketLog, logEntry]);
    ticketDetail.status = newStatus;
    setIsStatusModalVisible(false);
    message.success(`工单状态已更新为: ${newStatus}`);
  };

  // 显示关闭工单的对话框
  const showCloseModal = () => {
    setIsCloseModalVisible(true);
  };

  // 关闭关闭工单的对话框
  const handleCloseCancel = () => {
    setIsCloseModalVisible(false);
  };

  // 关闭工单并记录日志
  const handleCloseTicket = () => {
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      action: '关闭工单',
      description: `工单已关闭，关闭原因：${closeReason}`,
      operator: '管理员',
    };
    setTicketLog([...ticketLog, logEntry]);
    ticketDetail.status = '已关闭';
    ticketDetail.closedAt = new Date().toLocaleString();
    ticketDetail.closeReason = closeReason;
    setIsCloseModalVisible(false);
    message.success('工单已关闭');
  };

  // 添加回复并记录日志
  const handleAddReply = () => {
    if (newReply.trim()) {
      const logEntry = {
        timestamp: new Date().toLocaleString(),
        action: '回复新增',
        description: `添加了回复：“${newReply}”`,
        operator: '技术支持',
      };
      setTicketLog([...ticketLog, logEntry]);
      setUpdatedReplies([...updatedReplies, newReply]);
      setNewReply('');
      message.success('回复已添加');
    } else {
      message.error('回复内容不能为空');
    }
  };

  // 文件上传处理并记录日志
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      const logEntry = {
        timestamp: new Date().toLocaleString(),
        action: '附件上传',
        description: `上传了附件“${info.file.name}”`,
        operator: '客户',
      };
      setTicketLog([...ticketLog, logEntry]);
      setFileList([...fileList, info.file.name]);
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const handleFormSubmit = (values: any) => {
    console.log('表单提交:', values);
    message.success('工单信息已更新');
  };

  return (
    <div className="flex">
      {/* 左侧邮件详情 */}
      <div className="w-3/5 p-4">
        <Card title="邮件详情" className="cursor-pointer">
          <p>发件人: example@example.com</p>
          <p>收件人: user@example.com</p>
          <p>主题: 工单主题</p>
          <p>内容: 工单内容...</p>
        </Card>
      </div>

      {/* 中间工单状态和操作 */}

      <div className="w-[250px] p-4">
        <ProCard>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="标签" name="tags">
              <Input />
            </Form.Item>
            <Form.Item label="备注" name="notes">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item label="核实备注" name="verificationNotes">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item label="状态" name="status" initialValue={newStatus}>
              <Select>
                {statuses.map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="类型" name="type" initialValue={ticketDetail.type}>
              <Select>
                {types.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="组" name="group">
              <Select>
                {groups.map((group) => (
                  <Select.Option key={group} value={group}>
                    {group}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="客服" name="agent">
              <Select>
                {agents.map((agent) => (
                  <Select.Option key={agent} value={agent}>
                    {agent}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="优先级" name="priority">
              <Select>
                {priorities.map((priority) => (
                  <Select.Option key={priority} value={priority}>
                    {priority}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
            </Form.Item>
          </Form>
        </ProCard>
      </div>

      {/* 右侧工单详细信息 */}
      <div className="w-1/5 p-4">
        <Descriptions title={`工单详情 - ${ticketDetail.subject}`}>
          <Descriptions.Item label="工单号">{id}</Descriptions.Item>
          <Descriptions.Item label="状态">{ticketDetail.status}</Descriptions.Item>
          <Descriptions.Item label="类型">{ticketDetail.type}</Descriptions.Item>
          <Descriptions.Item label="内容">{ticketDetail.content}</Descriptions.Item>
          <Descriptions.Item label="附件">
            {fileList.join(', ')}
          </Descriptions.Item>
          <Descriptions.Item label="回复">
            {updatedReplies.map((reply, index) => (
              <div key={index}>{reply}</div>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            {ticketDetail.notes.join(' | ')}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{ticketDetail.createdAt}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{ticketDetail.updatedAt}</Descriptions.Item>
          <Descriptions.Item label="关闭时间">{ticketDetail.closedAt}</Descriptions.Item>
          <Descriptions.Item label="关闭人">{ticketDetail.closedBy}</Descriptions.Item>
          <Descriptions.Item label="关闭原因">{ticketDetail.closeReason}</Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* 显示历史日志 */}
        <div>
          <h3>工单历史记录</h3>
          <List
            itemLayout="horizontal"
            dataSource={ticketLog}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.timestamp} - ${item.operator}`}
                  description={`${item.action}: ${item.description}`}
                />
              </List.Item>
            )}
          />
        </div>

        <Divider />

        {/* 更新状态按钮 */}
        <Button type="primary" onClick={showStatusModal}>
          更新状态
        </Button>

        {/* 关闭工单按钮 */}
        <Button
          type="danger"
          onClick={showCloseModal}
          disabled={ticketDetail.status === '已关闭'}
        >
          关闭工单
        </Button>

        {/* 新增回复输入框 */}
        <Input.TextArea
          rows={4}
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <Button type="primary" onClick={handleAddReply}>
          添加回复
        </Button>

        {/* 上传附件 */}
        <Upload
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false} // 禁止自动上传
        >
          <Button icon={<UploadOutlined />}>上传附件</Button>
        </Upload>

        {/* 状态更新弹框 */}
        <Modal
          title="更新工单状态"
          visible={isStatusModalVisible}
          onOk={handleStatusChange}
          onCancel={handleStatusCancel}
        >
          <Select
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: '100%' }}
          >
            {statuses.map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Modal>

        {/* 关闭工单弹框 */}
        <Modal
          title="关闭工单"
          visible={isCloseModalVisible}
          onOk={handleCloseTicket}
          onCancel={handleCloseCancel}
        >
          <Input
            value={closeReason}
            onChange={(e) => setCloseReason(e.target.value)}
            placeholder="关闭原因"
          />
        </Modal>
      </div>
    </div>
  );
};

export default FreshdeskTicketDetails;
