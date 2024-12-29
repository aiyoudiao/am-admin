import { Test, TestingModule } from '@nestjs/testing';
import { TicketManageController } from './ticket-manage.controller';
import { TicketManageService } from './ticket-manage.service';

describe('TicketManageController', () => {
  let controller: TicketManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketManageController],
      providers: [TicketManageService],
    }).compile();

    controller = module.get<TicketManageController>(TicketManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
