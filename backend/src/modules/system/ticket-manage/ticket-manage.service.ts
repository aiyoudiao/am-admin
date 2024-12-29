import { Injectable } from '@nestjs/common';
import { CreateTicketManageDto } from './dto/create-ticket-manage.dto';
import { UpdateTicketManageDto } from './dto/update-ticket-manage.dto';

@Injectable()
export class TicketManageService {
  create(createTicketManageDto: CreateTicketManageDto) {
    return 'This action adds a new ticketManage';
  }

  findAll() {
    return `This action returns all ticketManage`;
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
