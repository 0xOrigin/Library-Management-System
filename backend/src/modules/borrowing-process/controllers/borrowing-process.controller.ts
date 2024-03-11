import { Controller, UseGuards, UseInterceptors } from '@nestjs/common';
import { BorrowingProcessService } from '../services/borrowing-process.service';
import { CoreController } from 'src/modules/core/controllers/core.controller';
import { LoggerInterceptor, ResponseInterceptor } from 'src/interceptors';
import { BorrowingProcessSerializer } from '../serializers/borrowing-process.serializer';
import { AuthGuard } from 'src/guards';

@UseInterceptors(ResponseInterceptor, LoggerInterceptor)
@UseGuards(AuthGuard)
@Controller({
  path: 'borrowing-process',
  version: '1',
})
export class BorrowingProcessController extends CoreController {
  constructor(
    private readonly borrowingProcessService: BorrowingProcessService,
  ) {
    super(borrowingProcessService, BorrowingProcessSerializer);
  }
}
