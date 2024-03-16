import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, MoreThan, Not, IsNull } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { CoreService } from 'src/modules/core/services/core.service';
import { User } from 'src/modules/users/models/user.model';
import { Book } from 'src/modules/books/models/book.model';
import { BorrowingProcess } from '../models/borrowing-process.model';
import { CreateBorrowingProcessDto } from '../dto/create-borrowing-process.dto';

@Injectable()
export class BorrowingProcessService extends CoreService {
  constructor(
    @InjectRepository(BorrowingProcess)
    private readonly borrowingProcessRepository: Repository<BorrowingProcess>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    i18nService: I18nService,
  ) {
    super(borrowingProcessRepository, i18nService);
  }

  async checkout(
    bookId: string,
    user: object,
    createDto: CreateBorrowingProcessDto,
  ) {
    // Check if the book exists
    const book = await this.bookRepository.findOneBy({ id: bookId });
    this.handleNotFound(book, 'Book not found');

    // Check if the book is already checked out
    const isCheckout = await super.isExists({
      book: bookId,
      user: (user as User).id,
      checkoutAt: Not(IsNull()),
      returnedAt: IsNull(),
    });
    if (isCheckout) {
      throw new BadRequestException('Book is already checked out');
    }

    // Apply actual checkout process
    await this.borrowingProcessRepository.manager.transaction(
      async (manager: EntityManager) => {
        // Decrement the available quantity of the book
        const updatedBook = await manager.decrement(
          Book,
          { id: bookId, availableQuantity: MoreThan(0) },
          'availableQuantity',
          1,
        );
        if (updatedBook.affected === 0) {
          throw new BadRequestException('Book is out of stock');
        }

        // Create a new borrowing process
        const borrowingProcess = manager.create(BorrowingProcess, {
          checkoutAt: new Date(),
          dueDate: createDto.dueDate,
          user: (user as any).id,
          book: (book as any).id,
        });
        await manager.insert(BorrowingProcess, borrowingProcess);
      },
    );

    return { message: 'Book has been checked out successfully' };
  }

  async return(bookId: string, user: object) {
    // Check if the book exists
    const book = await this.bookRepository.findOneBy({ id: bookId });
    this.handleNotFound(book, 'Book not found');

    // Apply actual return process
    await this.borrowingProcessRepository.manager.transaction(
      async (manager: EntityManager) => {
        // Update the borrowing process
        const updatedBorrowingProcess = await manager.update(
          BorrowingProcess,
          {
            book: bookId,
            user: (user as User).id,
            checkoutAt: Not(IsNull()),
            returnedAt: IsNull(),
          },
          { returnedAt: new Date() },
        );
        if (updatedBorrowingProcess.affected === 0) {
          throw new BadRequestException(
            'Book is not checked out, or already returned',
          );
        }

        // Increment the available quantity of the book
        await manager.increment(Book, { id: bookId }, 'availableQuantity', 1);
      },
    );

    return { message: 'Book has been returned successfully' };
  }
}
