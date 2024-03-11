import { NotFoundException } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export abstract class BaseService {
  constructor(
    protected readonly repository: Repository<any>,
    protected readonly i18nService: I18nService,
  ) {}

  // Translation
  protected getTranslation(key: string, field: string): string {
    return this.i18nService.translate(`${key}.${field}`, {
      lang: I18nContext.current()?.lang,
    });
  }

  // Error handling
  protected handleNotFound(instance: any): void | never {
    if (!instance) {
      throw new NotFoundException('Instance not found');
    }
  }

  // Utils for queries
  public getSelectForFindOne(): (keyof any)[] {
    return [];
  }

  public getSelectForFindAll(): (keyof any)[] {
    return [];
  }

  public getRelationsForFindOne(): object {
    return {};
  }

  public getRelationsForFindAll(): object {
    return {};
  }

  public async getCount(options: FindManyOptions): Promise<number> {
    return await this.repository.count(options);
  }

  protected async isExists(options: FindOptionsWhere<any>): Promise<boolean> {
    const instance = await this.repository.countBy(options);
    return instance > 0;
  }

  protected async getInstanceBy(options: FindOptionsWhere<any>): Promise<any> {
    return await this.getInstance({ where: options });
  }

  protected async getInstance(options: FindOneOptions<any>): Promise<any> {
    // If select and relations are not defined in options, get them from the service
    options.select = options.select ?? this.getSelectForFindOne();
    options.relations = options.relations ?? this.getRelationsForFindOne();
    const instance = await this.repository.findOne(options);
    this.handleNotFound(instance);
    return instance;
  }

  protected async getInstances(options: FindManyOptions): Promise<any> {
    // If select and relations are not defined in options, get them from the service
    options.select = options.select ?? this.getSelectForFindAll();
    options.relations = options.relations ?? this.getRelationsForFindAll();
    const instances = await this.repository.find(options);
    return instances;
  }

  protected async performCreate(createDto: object): Promise<any> {
    const instance = await this.repository.create(createDto);
    await this.repository.insert(instance);
    return instance;
  }

  protected async performUpdate(pk: string, updateDto: object): Promise<any> {
    const isExists = await this.isExists({ id: pk });
    this.handleNotFound(isExists);
    await this.repository.update(pk, updateDto);
  }

  protected async performUpdatePartial(
    pk: string,
    updateDto: object,
  ): Promise<any> {
    await this.performUpdate(pk, updateDto);
  }

  protected async performDelete(
    pk: string,
    softDelete: boolean,
  ): Promise<void> {
    const isExists = await this.isExists({ id: pk });
    this.handleNotFound(isExists);
    if (softDelete) {
      await this.repository.softDelete(pk);
    } else {
      await this.repository.delete(pk);
    }
  }
}
