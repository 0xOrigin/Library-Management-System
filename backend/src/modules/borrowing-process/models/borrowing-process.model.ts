import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from 'src/modules/books/models/book.model';
import { Audit } from 'src/modules/core/models/audit.model';
import { User } from 'src/modules/users/models/user.model';

@Entity()
export class BorrowingProcess extends Audit {
  @PrimaryColumn({ type: 'uuid', nullable: false, unique: false })
  @ManyToOne(() => User, (user) => user.borrowings, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn({ type: 'uuid', nullable: false, unique: false })
  @ManyToOne(() => Book, (book) => book.borrowings, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column({ type: 'timestamp with time zone', nullable: false })
  checkoutAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: false })
  dueDate: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  returnedAt: Date | null;
}
