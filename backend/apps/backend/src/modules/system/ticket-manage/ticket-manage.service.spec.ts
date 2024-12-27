import { Test, TestingModule } from '@nestjs/testing';
import { TicketManageService } from './ticket-manage.service';

describe('TicketManageService', () => {
  let service: TicketManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketManageService],
    }).compile();

    service = module.get<TicketManageService>(TicketManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
