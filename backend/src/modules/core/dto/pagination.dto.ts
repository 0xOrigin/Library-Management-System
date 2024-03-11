import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import * as constants from 'src/config/constants';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(constants.PAGINATION_MAX_PAGE_SIZE)
  @IsOptional()
  readonly pageSize: number = constants.PAGINATION_PAGE_SIZE;

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
