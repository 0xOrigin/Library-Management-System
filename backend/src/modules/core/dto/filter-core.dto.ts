import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { ToBoolean } from 'src/decorators';

/**
 * Important note: This class is intended to be extended by other DTOs.
 * In order to enable filtering operators: 
 * 1- DTO that extends this class must have properties that match the entity's fields
 * 2- Type of the properties must contain object. Example: string | object
 */
export class FilterCoreDto extends PaginationDto {
  @Matches(/^[a-zA-Z0-9_,-]+$/, {
    message: `sort must be a string and must contain a comma separated list of fields with an optional [-] prefix to indicate descending order. Example: "field1,-field2"`,
  })
  @IsString()
  @IsOptional()
  readonly sort: string | undefined = undefined;

  @ToBoolean()
  @IsBoolean()
  @IsOptional()
  readonly withDeleted: boolean = false;
}
