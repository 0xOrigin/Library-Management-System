import { FindManyOptions } from 'typeorm';
import { BaseService } from './base.service';
import { FindOneOptionsWhereOmitted } from '../types';

/**
 * @description A class that contains the basic CRUD operations for the entity.
 * It extends the [BaseService] class to inherit the basic CRUD operations and some API features.
 * It is an abstract class to be extended by the child services to implement the entity specific CRUD operations.
 * It is a generic class to be used with any entity.
 */
export abstract class CoreService extends BaseService {

  /**
   * @description Create a new instance of the entity.
   * @param createDto The data to be used to create the new instance.
   * @returns The newly created instance.
   */
  async create(createDto: object): Promise<any> {
    const instance = await this.performCreate(createDto);
    return instance;
  }

  /**
   * @description Find all instances of the entity.
   * @param options The options to be used to find the instances.
   * @returns All filtered instances of the entity.
   */
  async findAll(options: FindManyOptions): Promise<any> {
    const instances = await this.getInstances(options);
    return instances;
  }

  /**
   * @description Find one instance of the entity by its id.
   * @param id The id of the instance to be found.
   * @param options The options to be used to find the instance.
   * @returns The found instance.
   */
  async findOne(id: string, options: FindOneOptionsWhereOmitted): Promise<any> {
    const instance = await this.getInstance({ where: { id }, ...options });
    return instance;
  }

  /**
   * @description Update an instance of the entity by its id.
   * @param id The id of the instance to be updated.
   * @param updateDto The data to be used to update the instance.
   * @returns The updated instance.
   */
  async update(id: string, updateDto: object): Promise<any> {
    await this.performUpdate(id, updateDto);
    return await this.getInstanceBy({ id });
  }

  /**
   * @description Partially Update an instance of the entity by its id.
   * @param id The id of the instance to be updated.
   * @param updateDto The data to be used to update the instance.
   * @returns The updated instance.
   */
  async updatePartial(id: string, updateDto: object): Promise<any> {
    await this.performUpdatePartial(id, updateDto);
    return await this.getInstanceBy({ id });
  }

  /**
   * @description Remove an instance of the entity by its id.
   * @param id The id of the instance to be removed.
   * @param softDelete A flag to indicate if the instance should be soft deleted.
   */
  async remove(id: string, softDelete: boolean): Promise<void> {
    await this.performDelete(id, softDelete);
  }
}
