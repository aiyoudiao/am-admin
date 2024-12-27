-- CreateTable
CREATE TABLE `am_already` (
    `id` CHAR(36) NOT NULL,
    `announcement_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    INDEX `announcement_id`(`announcement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_announcement` (
    `announcement_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `type` ENUM('1', '2', '3', '4') NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `pinned` INTEGER NOT NULL DEFAULT 1,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`announcement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_comment` (
    `id` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `text` TEXT NOT NULL,
    `public` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(50) NULL,
    `ticketId` VARCHAR(50) NOT NULL,
    `reply` BOOLEAN NOT NULL DEFAULT false,
    `replyEmail` VARCHAR(100) NULL,

    INDEX `idx_created_at`(`createdAt`),
    INDEX `idx_public`(`public`),
    INDEX `idx_ticket_id`(`ticketId`),
    INDEX `idx_user_id`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_email` (
    `id` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `active` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(50) NULL,
    `user` VARCHAR(100) NOT NULL,
    `pass` VARCHAR(255) NULL,
    `secure` BOOLEAN NOT NULL DEFAULT false,
    `host` VARCHAR(100) NOT NULL,
    `reply` VARCHAR(100) NOT NULL,
    `port` VARCHAR(10) NOT NULL,
    `clientId` VARCHAR(255) NULL,
    `clientSecret` VARCHAR(255) NULL,
    `refreshToken` TEXT NULL,
    `serviceType` VARCHAR(50) NOT NULL DEFAULT 'other',
    `tenantId` VARCHAR(50) NULL,
    `accessToken` TEXT NULL,
    `expiresIn` BIGINT NULL,
    `redirectUri` VARCHAR(255) NULL,

    INDEX `idx_active`(`active`),
    INDEX `idx_service_type`(`serviceType`),
    INDEX `idx_user_email`(`user`),
    INDEX `idx_user_id`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_international` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(32) NOT NULL,
    `parent_id` CHAR(36) NULL,
    `zh-CN` VARCHAR(200) NULL,
    `en-US` VARCHAR(500) NULL,
    `ja-JP` VARCHAR(200) NULL,
    `zh-TW` VARCHAR(200) NULL,
    `founder` CHAR(36) NOT NULL,
    `sort` INTEGER NOT NULL,
    `created_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_time` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_jobs` (
    `jobs_id` CHAR(36) NOT NULL,
    `jobs_name` VARCHAR(20) NOT NULL,
    `org_id` CHAR(36) NOT NULL,
    `parent_id` CHAR(36) NULL,
    `describe` VARCHAR(200) NOT NULL,
    `sort` INTEGER NOT NULL,
    `leader` CHAR(36) NOT NULL,
    `founder` CHAR(36) NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    INDEX `org_id`(`org_id`),
    PRIMARY KEY (`jobs_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_logs` (
    `log_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `ip` VARCHAR(50) NOT NULL,
    `os` VARCHAR(200) NOT NULL,
    `params` JSON NOT NULL,
    `method` VARCHAR(20) NOT NULL,
    `api_url` VARCHAR(100) NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,
    `browser` VARCHAR(200) NOT NULL,
    `province` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `adcode` VARCHAR(100) NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_menu` (
    `menu_id` CHAR(36) NOT NULL,
    `name` CHAR(36) NOT NULL,
    `menu_type` ENUM('dir', 'menu', 'button') NOT NULL,
    `path` VARCHAR(100) NULL,
    `icon` VARCHAR(50) NULL,
    `component` VARCHAR(200) NULL,
    `redirect` VARCHAR(100) NULL,
    `parent_id` CHAR(36) NULL,
    `target` ENUM('_blank', '_self', '_parent', '_top') NULL,
    `permission` VARCHAR(100) NULL,
    `layout` ENUM('side', 'top', 'mix') NULL,
    `navTheme` ENUM('dark', 'light') NULL,
    `headerTheme` ENUM('dark', 'light') NULL,
    `hideChildrenInMenu` INTEGER NULL,
    `hideInMenu` INTEGER NULL,
    `hideInBreadcrumb` INTEGER NULL,
    `headerRender` INTEGER NULL,
    `footerRender` INTEGER NULL,
    `menuRender` INTEGER NULL,
    `menuHeaderRender` INTEGER NULL,
    `flatMenu` INTEGER NULL,
    `fixedHeader` INTEGER NULL,
    `fixSiderbar` INTEGER NULL,
    `founder` CHAR(36) NOT NULL,
    `sort` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_organization` (
    `org_id` CHAR(36) NOT NULL,
    `org_name` VARCHAR(20) NOT NULL,
    `parent_id` CHAR(36) NULL,
    `org_code` VARCHAR(32) NOT NULL,
    `org_type` ENUM('group', 'company', 'unit', 'department') NOT NULL,
    `org_logo` VARCHAR(200) NULL,
    `leader` CHAR(36) NOT NULL,
    `founder` CHAR(36) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `sort` INTEGER NOT NULL,
    `describe` VARCHAR(200) NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    PRIMARY KEY (`org_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_permission` (
    `permission_id` CHAR(36) NOT NULL,
    `role_id` CHAR(36) NULL,
    `menu_id` CHAR(36) NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_role` (
    `role_id` CHAR(36) NOT NULL,
    `role_name` VARCHAR(20) NOT NULL,
    `role_code` VARCHAR(20) NOT NULL,
    `describe` VARCHAR(200) NOT NULL,
    `founder` CHAR(36) NOT NULL,
    `sort` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_ticket` (
    `id` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(100) NULL,
    `title` VARCHAR(255) NOT NULL,
    `detail` TEXT NULL,
    `email` VARCHAR(100) NULL,
    `isComplete` BOOLEAN NOT NULL DEFAULT false,
    `priority` VARCHAR(20) NOT NULL,
    `fromImap` BOOLEAN NOT NULL DEFAULT false,
    `Number` INTEGER NOT NULL,
    `status` ENUM('needs_support', 'in_progress', 'in_review', 'done', 'hold') NOT NULL DEFAULT 'needs_support',
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `locked` BOOLEAN NOT NULL DEFAULT false,
    `following` JSON NULL,

    UNIQUE INDEX `idx_number`(`Number`),
    INDEX `idx_created_at`(`createdAt`),
    INDEX `idx_email`(`email`),
    INDEX `idx_is_complete`(`isComplete`),
    INDEX `idx_priority`(`priority`),
    INDEX `idx_status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `am_user` (
    `user_id` CHAR(36) NOT NULL,
    `user_name` VARCHAR(20) NOT NULL,
    `work_no` VARCHAR(20) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `cn_name` VARCHAR(20) NOT NULL,
    `en_name` VARCHAR(20) NULL,
    `age` INTEGER NOT NULL,
    `email` VARCHAR(50) NULL,
    `phone` VARCHAR(11) NOT NULL,
    `avatar_url` VARCHAR(200) NULL,
    `sex` ENUM('0', '1', '2') NOT NULL,
    `sort` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `token` BLOB NULL,
    `motto` VARCHAR(50) NULL,
    `tags` JSON NULL,
    `city` JSON NULL,
    `address` VARCHAR(200) NULL,
    `jobs_id` CHAR(36) NOT NULL,
    `org_id` CHAR(36) NOT NULL,
    `role_id` CHAR(36) NOT NULL,
    `founder` CHAR(36) NOT NULL,
    `login_num` INTEGER NOT NULL DEFAULT 0,
    `login_last_ip` VARCHAR(20) NULL,
    `login_last_time` DATETIME(0) NULL,
    `created_time` DATETIME(0) NOT NULL,
    `updated_time` DATETIME(0) NOT NULL,

    INDEX `founder`(`founder`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `am_already` ADD CONSTRAINT `am_already_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `am_announcement`(`announcement_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_announcement` ADD CONSTRAINT `am_announcement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `am_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_jobs` ADD CONSTRAINT `am_jobs_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `am_organization`(`org_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_logs` ADD CONSTRAINT `am_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `am_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_permission` ADD CONSTRAINT `am_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `am_role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_user` ADD CONSTRAINT `am_user_ibfk_8` FOREIGN KEY (`founder`) REFERENCES `am_user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `am_user` ADD CONSTRAINT `am_user_ibfk_9` FOREIGN KEY (`role_id`) REFERENCES `am_role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

