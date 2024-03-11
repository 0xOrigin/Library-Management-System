import { Module } from '@nestjs/common';
import { BorrowingProcessService } from './services/borrowing-process.service';
import { BorrowingProcessController } from './controllers/borrowing-process.controller';

@Module({
  controllers: [BorrowingProcessController],
  providers: [BorrowingProcessService],
})
export class BorrowingProcessModule {}
