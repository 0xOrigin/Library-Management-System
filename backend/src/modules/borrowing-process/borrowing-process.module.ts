import { Module } from '@nestjs/common';
import { BorrowingProcessService } from './services/borrowing-process.service';
import { BorrowingProcessController } from './controllers/borrowing-process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingProcess } from './models/borrowing-process.model';
import { Book } from '../books/models/book.model';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowingProcess, Book])],
  controllers: [BorrowingProcessController],
  providers: [BorrowingProcessService],
})
export class BorrowingProcessModule {}
