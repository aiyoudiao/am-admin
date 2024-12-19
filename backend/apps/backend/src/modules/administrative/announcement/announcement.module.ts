/*
 * @Description: Announcement Module
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwAlready } from '@/models/xmw_already.model'; // xmw_already 实体
import { XmwAnnouncement } from '@/models/xmw_announcement.model'; // xmw_announcement 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module';

import { AnnouncementController } from './announcement.controller'; // Announcement Controller
import { AnnouncementService } from './announcement.service'; // Announcement Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    SequelizeModule.forFeature([XmwAnnouncement, XmwAlready]),
    OperationLogsModule,
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [AnnouncementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [AnnouncementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [AnnouncementService],
})
export class AnnouncementModule { }
