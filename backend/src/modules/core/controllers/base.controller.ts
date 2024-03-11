import { FindManyOptions } from 'typeorm';
import { CoreService } from '../services/core.service';
import { PaginationDto } from '../dto/pagination.dto';
import { FilterCoreDto } from '../dto/filter-core.dto';
import {
  MetaOptions,
  ResponseType,
  PaginatedResponseType,
  CoreFindManyOptions,
  BaseControllerOptions,
} from '../types';
import {
  FilterFeature,
  PaginationFeature,
  ResponseShapeFeature,
  SerializationFeature,
  SortFeature,
} from '../api-features';
import {
  IFilterFeature,
  IPaginationFeature,
  IResponseShapeFeature,
  ISerializationFeature,
  ISortFeature,
} from '../interfaces';

export abstract class BaseController {
  private readonly serializationFeature: ISerializationFeature;
  private readonly paginationFeature: IPaginationFeature;
  private readonly sortFeature: ISortFeature;
  private readonly filterFeature: IFilterFeature;
  private readonly responseShapeFeature: IResponseShapeFeature;

  constructor(
    protected readonly service: CoreService,
    serializerClass: any,
    options?: BaseControllerOptions,
  ) {
    this.paginationFeature = options?.paginationFeature ?? new PaginationFeature();
    this.sortFeature = options?.sortFeature ?? new SortFeature();
    this.filterFeature = options?.filterFeature ?? new FilterFeature();
    this.responseShapeFeature = options?.responseShapeFeature ?? new ResponseShapeFeature();
    this.serializationFeature = options?.serializationFeature ?? new SerializationFeature(serializerClass);
  }

  protected async paginate(
    count: number,
    options: FindManyOptions,
    service: CoreService,
  ): Promise<any> {
    return await this.paginationFeature.paginate(count, options, service);
  }

  protected getFindAllPaginatedResponse(
    metaOptions: MetaOptions,
    options: FindManyOptions,
    data: any[],
  ): PaginatedResponseType {
    return this.paginationFeature.getFindAllPaginatedResponse(
      metaOptions,
      options,
      data,
    );
  }

  protected getFindAllResponse(
    metaOptions: MetaOptions,
    data: any[],
  ): ResponseType {
    return this.responseShapeFeature.getFindAllResponse(metaOptions, data);
  }

  protected serialize(data: any) {
    return this.serializationFeature.serialize(data);
  }

  protected handleFindAllOptions(
    filterDto: object,
    paginate: boolean,
    options: CoreFindManyOptions = {},
  ): void {
    if (paginate) this.setPaginationOptions(filterDto, options);
    this.setSoftDeleteOptions(filterDto, options);
    this.setFilterOptions(filterDto, options);
    this.setSortOptions(filterDto, options);
  }

  private setPaginationOptions(
    filterDto: object,
    options: FindManyOptions,
  ): void {
    if (!filterDto) return;

    const { pageSize, skip } = filterDto as PaginationDto;
    options.take = pageSize;
    options.skip = skip;
  }

  private setSoftDeleteOptions(
    filterDto: object,
    options: FindManyOptions,
  ): void {
    if (!filterDto) return;

    const { withDeleted } = filterDto as FilterCoreDto;
    options.withDeleted = withDeleted;
  }

  private setFilterOptions(filterDto: object, options: FindManyOptions): void {
    if (!filterDto) return;
    const excludeFields = Object.keys(new FilterCoreDto());
    const filterOptions = this.filterFeature.generateFilterOptions(filterDto, excludeFields);
    options.where = { ...options.where, ...filterOptions};
  }

  private setSortOptions(filterDto: object, options: FindManyOptions): void {
    if (!filterDto) return;

    const { sort } = filterDto as FilterCoreDto;
    options.order = this.sortFeature.generateSortOptions(sort);
  }
}
