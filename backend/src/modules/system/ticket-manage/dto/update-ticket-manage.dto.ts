import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketManageDto } from './create-ticket-manage.dto';

export class UpdateTicketManageDto extends PartialType(CreateTicketManageDto) {}
