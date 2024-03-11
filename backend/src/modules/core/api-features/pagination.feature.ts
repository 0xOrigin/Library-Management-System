import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';
import { MetaOptions, PaginatedResponseType } from '../types';
import { CoreService } from '../services/core.service';
import { IPaginationFeature } from '../interfaces/pagination.interface';

export class PaginationFeature implements IPaginationFeature {
  public async paginate(
    count: number,
    options: FindManyOptions,
    service: CoreService,
  ): Promise<any> | never {
    if (options.take === undefined || options.skip === undefined) return null;
    this.handleInvalidPage(count, options);
    const instances = await service.findAll(options);
    return instances;
  }

  public getFindAllPaginatedResponse(
    metaOptions: MetaOptions,
    options: FindManyOptions,
    data: any[],
  ): PaginatedResponseType | never {
    const page = this.getPageNumber(options);
    const totalPages = this.getTotalPages(metaOptions.count, options);
    return {
      meta: {
        ...metaOptions,
      },
      pagination: {
        prev: page > 1 ? page - 1 : null,
        next: page < totalPages ? page + 1 : null,
        last: totalPages > 0 ? totalPages : null,
      },
      data,
    };
  }

  private getPageNumber(options: FindManyOptions): number | never {
    try {
      return options.skip! / options.take! + 1;
    } catch (error) {
      throw new BadRequestException('page and/or pageSize is/are not defined');
    }
  }

  private getTotalPages(
    count: number,
    options: FindManyOptions,
  ): number | never {
    try {
      return Math.ceil(count / options.take!);
    } catch (error) {
      throw new BadRequestException(
        'instances-count and/or pageSize is/are not defined',
      );
    }
  }

  private handleInvalidPage(
    count: number,
    options: FindManyOptions,
  ): void | never {
    if (options.take === undefined || options.skip === undefined) return;

    const page = this.getPageNumber(options);
    if (page === 1 && count === 0) return;

    if (page > this.getTotalPages(count, options)) {
      throw new NotFoundException('Invalid page');
    }
  }
}
