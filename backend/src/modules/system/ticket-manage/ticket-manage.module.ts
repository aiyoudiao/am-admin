import { Module } from '@nestjs/common';
import { TicketManageService } from './ticket-manage.service';
import { TicketManageController } from './ticket-manage.controller';

@Module({
  controllers: [TicketManageController],
  providers: [TicketManageService],
})
export class TicketManageModule {}
