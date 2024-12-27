import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketManageService } from './ticket-manage.service';
import { CreateTicketManageDto } from './dto/create-ticket-manage.dto';
import { UpdateTicketManageDto } from './dto/update-ticket-manage.dto';

@Controller('ticket-manage')
export class TicketManageController {
  constructor(private readonly ticketManageService: TicketManageService) {}

  @Post()
  create(@Body() createTicketManageDto: CreateTicketManageDto) {
    return this.ticketManageService.create(createTicketManageDto);
  }

  @Get()
  findAll() {
    return this.ticketManageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketManageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketManageDto: UpdateTicketManageDto) {
    return this.ticketManageService.update(+id, updateTicketManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketManageService.remove(+id);
  }
}
