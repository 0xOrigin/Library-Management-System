import { Expose } from "class-transformer";

export class BorrowingProcessSerializer {
  @Expose()
  id: string;

  @Expose()
  book: object;

  @Expose()
  checkoutAt: Date;
  
  @Expose()
  dueDate: Date;

  @Expose()
  returnedAt: Date;
}
