import { IsOptional } from 'class-validator';
import { FilterCoreDto } from 'src/modules/core/dto/filter-core.dto';

export class FilterBorrowingProcessDto extends FilterCoreDto {
  @IsOptional()
  dueDate: Date | object;

  @IsOptional()
  checkoutAt: Date | object;

  @IsOptional()
  returnedAt: Date | object;

  @IsOptional()
  book: string | object;
}
