import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Book } from 'src/modules/books/models/book.model';
import { User } from 'src/modules/users/models/user.model';

export class CreateBorrowingProcessDto {
  @IsNotEmpty()
  @Type(() => Book)
  bookId: Book;

  @IsNotEmpty()
  @Type(() => User)
  userId: User;

  @IsNotEmpty()
  @IsDateString()
  checkoutAt: Date;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsDateString()
  returnedAt: Date | null;
}
