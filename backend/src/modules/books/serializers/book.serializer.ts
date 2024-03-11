import { Expose } from 'class-transformer';

export class BookSerializer {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  isbn: string;

  @Expose()
  availableQuantity: number;

  @Expose()
  shelfLocation: string;
}
