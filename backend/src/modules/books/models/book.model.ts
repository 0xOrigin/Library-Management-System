import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Audit } from 'src/modules/core/models/audit.model';
import { BorrowingProcess } from 'src/modules/borrowing-process/models/borrowing-process.model';

@Entity()
export class Book extends Audit {
  @Column({ type: 'varchar', unique: true, length: 150, nullable: false })
  @Index()
  title: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  author: string;

  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  @Index()
  isbn: string;

  @Column({ type: 'integer', nullable: false })
  availableQuantity: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  shelfLocation: string;

  @OneToMany(() => BorrowingProcess, (borrowing) => borrowing.book)
  borrowings: BorrowingProcess[];
}
