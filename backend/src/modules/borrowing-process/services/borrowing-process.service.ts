import { Injectable } from '@nestjs/common';
import { CoreService } from 'src/modules/core/services/core.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowingProcess } from '../models/borrowing-process.model';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class BorrowingProcessService extends CoreService {
  constructor(
    @InjectRepository(BorrowingProcess)
    private readonly borrowingProcessRepository: Repository<BorrowingProcess>,
    i18nService: I18nService,
  ) {
    super(borrowingProcessRepository, i18nService);
  }
}
