import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingProcessService } from './borrowing-process.service';

describe('BorrowingProcessService', () => {
  let service: BorrowingProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowingProcessService],
    }).compile();

    service = module.get<BorrowingProcessService>(BorrowingProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
