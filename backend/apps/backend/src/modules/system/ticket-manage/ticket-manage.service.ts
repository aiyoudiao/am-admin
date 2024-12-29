import { Injectable } from '@nestjs/common';
import { am_ticket } from '@/prisma';

import { CreateTicketManageDto } from './dto/create-ticket-manage.dto';
import { UpdateTicketManageDto } from './dto/update-ticket-manage.dto';
import { responseMessage } from '@/utils'; // 全局工具函数

@Injectable()
export class TicketManageService {
  create(createTicketManageDto: CreateTicketManageDto) {
    return 'This action adds a new ticketManage';
  }

  async findAll() {
    const response = await am_ticket.findMany();
    return responseMessage(response);
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketManage`;
  }

  update(id: number, updateTicketManageDto: UpdateTicketManageDto) {
    return `This action updates a #${id} ticketManage`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketManage`;
  }
}
