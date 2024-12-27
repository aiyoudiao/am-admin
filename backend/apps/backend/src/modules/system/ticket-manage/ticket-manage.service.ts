import { Injectable } from '@nestjs/common';
import { am_ticket } from '@/prisma';

import { CreateTicketManageDto } from './dto/create-ticket-manage.dto';
import { UpdateTicketManageDto } from './dto/update-ticket-manage.dto';

@Injectable()
export class TicketManageService {
  create(createTicketManageDto: CreateTicketManageDto) {
    return 'This action adds a new ticketManage';
  }

  findAll() {
    return am_ticket.findMany();
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
