/*
 * @Description: RoleManagement Controller
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import { TicketManageService } from './ticket-manage.service';
import { CreateTicketManageDto } from './dto/create-ticket-manage.dto';
import { UpdateTicketManageDto } from './dto/update-ticket-manage.dto';

@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('system/ticket-manage')
export class TicketManageController {
  constructor(private readonly ticketManageService: TicketManageService) {}

  @Post()
  create(@Body() createTicketManageDto: CreateTicketManageDto) {
    return this.ticketManageService.create(createTicketManageDto);
  }

  @Get()
  async findAll() {
    const response = await this.ticketManageService.findAll();
    console.log('response', response);
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketManageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketManageDto: UpdateTicketManageDto,
  ) {
    return this.ticketManageService.update(+id, updateTicketManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketManageService.remove(+id);
  }
}
