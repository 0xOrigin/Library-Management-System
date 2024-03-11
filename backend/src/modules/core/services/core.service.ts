import { FindManyOptions } from 'typeorm';
import { BaseService } from './base.service';
import { FindOneOptionsWhereOmitted } from '../types';

export abstract class CoreService extends BaseService {

  async create(createDto: object): Promise<any> {
    const instance = await this.performCreate(createDto);
    return instance;
  }

  async findAll(options: FindManyOptions): Promise<any> {
    const instances = await this.getInstances(options);
    return instances;
  }

  async findOne(id: string, options: FindOneOptionsWhereOmitted): Promise<any> {
    const instance = await this.getInstance({ where: { id }, ...options });
    return instance;
  }

  async update(id: string, updateDto: object): Promise<any> {
    await this.performUpdate(id, updateDto);
    return await this.getInstanceBy({ id });
  }

  async updatePartial(id: string, updateDto: object): Promise<any> {
    await this.performUpdatePartial(id, updateDto);
    return await this.getInstanceBy({ id });
  }

  async remove(id: string, softDelete: boolean): Promise<void> {
    await this.performDelete(id, softDelete);
  }
}
