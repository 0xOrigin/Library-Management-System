import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { LoggerInterceptor, ResponseInterceptor } from 'src/interceptors';
import { CoreController } from 'src/modules/core/controllers/core.controller';
import { BooksService } from '../services/books.service';
import { BookSerializer } from '../serializers/book.serializer';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FilterBookDto } from '../dto/filter-book.dto';

@UseInterceptors(ResponseInterceptor, LoggerInterceptor)
@Controller({
  path: 'books',
  version: '1',
})
export class BooksController extends CoreController {
  constructor(private readonly booksService: BooksService) {
    super(booksService, BookSerializer);
  }

  @Post()
  async create(createBookDto: CreateBookDto): Promise<any> {
    return await super.create(createBookDto);
  }

  @Get()
  async findAll(filterDto: FilterBookDto) {
    return await super.findAll(filterDto, true);
  }

  @Get(':id')
  async findOne(id: string) {
    return await super.findOne(id);
  }

  @Put(':id')
  async update(id: string, updateBookDto: UpdateBookDto) {
    return await super.update(id, updateBookDto);
  }

  @Patch(':id')
  async updatePartial(id: string, updateBookDto: UpdateBookDto) {
    return await super.updatePartial(id, updateBookDto);
  }

  @Delete(':id')
  async remove(id: string) {
    return await super.remove(id, true);
  }
}
