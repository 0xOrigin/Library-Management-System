import { FindManyOptions } from 'typeorm';
import { CoreService } from '../services/core.service';
import { MetaOptions, PaginatedResponseType } from '../types';

export interface IPaginationFeature {
  paginate(
    count: number,
    options: FindManyOptions,
    service: CoreService,
  ): Promise<any> | never;

  getFindAllPaginatedResponse(
    metaOptions: MetaOptions,
    options: FindManyOptions,
    data: any[],
  ): PaginatedResponseType | never;
}
