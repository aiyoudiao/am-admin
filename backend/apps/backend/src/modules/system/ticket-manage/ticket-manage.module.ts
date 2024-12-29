import { Module } from '@nestjs/common';
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志
import { TicketManageService } from './ticket-manage.service';
import { TicketManageController } from './ticket-manage.controller';

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [OperationLogsModule],
  controllers: [TicketManageController],
  providers: [TicketManageService],
    // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
    exports: [TicketManageService],
})
export class TicketManageModule {}
