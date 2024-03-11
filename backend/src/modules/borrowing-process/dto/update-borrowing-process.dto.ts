import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowingProcessDto } from './create-borrowing-process.dto';

export class UpdateBorrowingProcessDto extends PartialType(CreateBorrowingProcessDto) {}
