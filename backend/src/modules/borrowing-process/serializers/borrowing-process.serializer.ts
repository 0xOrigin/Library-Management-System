import { Expose, Type } from "class-transformer";
import { BookSerializer } from "src/modules/books/serializers/book.serializer";

export class BorrowingProcessSerializer {
  @Expose()
  id: string;

  @Expose()
  @Type(() => BookSerializer)
  book: object | string;

  @Expose()
  checkoutAt: Date;
  
  @Expose()
  dueDate: Date;

  @Expose()
  returnedAt: Date;

  @Expose()
  message: string; // This is not in the original class but used in the controller
}
