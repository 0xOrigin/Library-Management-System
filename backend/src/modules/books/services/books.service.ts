import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { CoreService } from 'src/modules/core/services/core.service';
import { Book } from '../models/book.model';

@Injectable()
export class BooksService extends CoreService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    i18nService: I18nService,
  ) {
    super(bookRepository, i18nService);
  }
}
