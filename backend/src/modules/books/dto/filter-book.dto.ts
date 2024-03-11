import {
  IsOptional,
} from 'class-validator';
import { FilterCoreDto } from 'src/modules/core/dto/filter-core.dto';

export class FilterBookDto extends FilterCoreDto {
  @IsOptional()
  title: string | object;

  @IsOptional()
  author: string | object;

  @IsOptional()
  isbn: string | object;

  @IsOptional()
  createdAt: Date | object;
}
