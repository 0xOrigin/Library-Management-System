import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Not, IsNull, LessThan } from 'typeorm';
import { AuthGuard } from 'src/guards';
import { CurrentUser } from 'src/decorators';
import { LoggerInterceptor, ResponseInterceptor } from 'src/interceptors';
import { CoreController } from 'src/modules/core/controllers/core.controller';
import { BorrowingProcessService } from '../services/borrowing-process.service';
import { BorrowingProcessSerializer } from '../serializers/borrowing-process.serializer';
import { CreateBorrowingProcessDto } from '../dto/create-borrowing-process.dto';
import { FilterBorrowingProcessDto } from '../dto/filter-borrowing-process.dto';

@UseInterceptors(ResponseInterceptor, LoggerInterceptor)
@UseGuards(AuthGuard)
@Controller({
  path: 'borrowings',
  version: '1',
})
export class BorrowingProcessController extends CoreController {
  constructor(
    private readonly borrowingProcessService: BorrowingProcessService,
  ) {
    super(borrowingProcessService, BorrowingProcessSerializer);
  }

  @Get()
  async findAllByUser(
    @Query() filterDto: FilterBorrowingProcessDto,
    @CurrentUser() user: object,
  ) {
    return await super.findAll(filterDto, true, {
      where: {
        user: (user as any).id,
      },
    });
  }

  @Get('borrowed')
  async findBorrowedByUser(
    @Query() filterDto: FilterBorrowingProcessDto,
    @CurrentUser() user: object,
  ) {
    return await super.findAll(
      filterDto,
      true,
      {
        where: {
          user: (user as any).id,
          checkoutAt: Not(IsNull()),
          returnedAt: IsNull(),
        },
        relations: ['book'],
      },
    );
  }

  @Get('overdue')
  async findOverdueByUser(
    @Query() filterDto: FilterBorrowingProcessDto,
    @CurrentUser() user: object,
  ) {
    return await super.findAll(
      filterDto,
      true,
      {
        where: {
          user: (user as any).id,
          checkoutAt: Not(IsNull()),
          returnedAt: IsNull(),
          dueDate: LessThan(new Date()),
        },
      },
    );
  }

  @Post('checkout/:bookId')
  async checkout(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @CurrentUser() user: object,
    @Body() createDto: CreateBorrowingProcessDto,
  ) {
    const instance = this.borrowingProcessService.checkout(
      bookId,
      user,
      createDto,
    );
    return this.serialize(instance);
  }

  @Get('return/:bookId')
  async return(
    @Param('bookId', ParseUUIDPipe) bookId: string,
    @CurrentUser() user: object,
  ) {
    const instance = this.borrowingProcessService.return(bookId, user);
    return this.serialize(instance);
  }
}
