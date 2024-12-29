## 数据库表设计

### 工单表 Ticket

```sql
CREATE TABLE `Ticket` (
  `id` text PRIMARY KEY NOT NULL, -- 工单号
  `createdAt` timestamp(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP),  -- 创建事件
  `updatedAt` timestamp(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 更新时间
  `name` text, -- 创建人
  `title` text NOT NULL, -- 工单标题
  `detail` text, -- 工单内容
  `email` text, -- 发件人邮箱
  `note` text, 
  `isComplete` boolean NOT NULL, -- 是否完成
  `priority` text NOT NULL, -- 优先级
  `clientId` text,
  `userId` text,
  `linked` JSON,
  `teamId` text,
  `fromImap` boolean NOT NULL, -- 是否是通过 Imap 协议拉取
  `Number` integer NOT NULL, 
  `status` ENUM('needs_support', 'in_progress', 'in_review', 'done', 'hold') NOT NULL DEFAULT 'needs_support', -- 工单状态
  `type` ENUM('bug', 'feature', 'support', 'incident', 'service', 'maintenance', 'access', 'feedback') NOT NULL DEFAULT 'support', -- 工单类型
  `hidden` boolean NOT NULL DEFAULT false, -- 是否隐藏
  `createdBy` JSON, 
  `locked` boolean NOT NULL DEFAULT false, -- 是否锁定
  `following` JSON -- 关注该工单的用户
);
```

### 工单评论表 Comment

```sql
CREATE TABLE `Comment` (
  `id` text PRIMARY KEY NOT NULL, -- 评论编号
  `createdAt` timestamp(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 创建时间
  `text` text NOT NULL, -- 评论内容
  `public` boolean NOT NULL DEFAULT false, -- 是否公开
  `userId` text, -- 用户编号
  `ticketId` text NOT NULL, -- 工单编号
  `reply` boolean NOT NULL DEFAULT false, - 是否属于回复
  `replyEmail` text, -- 回复的邮箱
  `edited` boolean NOT NULL DEFAULT false, 
  `editedAt` timestamp(3),
  `previous` text
);
```

### 邮箱表

当前用户绑定的邮箱，用户可以通过这个邮箱发送邮件。

```sql
CREATE TABLE `Email` (
  `id` text PRIMARY KEY NOT NULL, -- 邮箱编号
  `createdAt` timestamp(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 创建时间
  `updatedAt` timestamp(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP), -- 更新时间
  `active` boolean NOT NULL DEFAULT false, -- 是否激活
  `userId` text, -- 用户编号
  `user` text NOT NULL, -- 用户邮箱
  `pass` text, -- 用户密码
  `secure` boolean NOT NULL DEFAULT false, -- 邮箱密钥
  `host` text NOT NULL, -- 邮箱服务器
  `reply` text NOT NULL, -- 回复邮箱
  `port` text NOT NULL, -- 邮箱服务器端口
  `clientId` text, -- 绑定的邮箱客户端编号
  `clientSecret` text, -- 绑定的邮箱客户端密钥
  `refreshToken` text, -- 绑定的邮箱客户端的刷新 token
  serviceType VARCHAR(255) NOT NULL DEFAULT 'other', -- 定的邮箱服务类型，比如谷歌邮箱，微软邮箱等
  `tenantId` text,
  `accessToken` text, -- 绑定的邮箱客户端的访问授权的 token
  `expiresIn` bigint, -- 绑定的邮箱客户端的 token 过期时间
  `redirectUri` text -- 授权成功后的重定向地址
);
```

