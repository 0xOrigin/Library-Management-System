import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBorrowingProcessDto {
  @IsDateString()
  @Transform(({ value }) => value.toISOString())
  @IsNotEmpty()
  dueDate: Date;
}
