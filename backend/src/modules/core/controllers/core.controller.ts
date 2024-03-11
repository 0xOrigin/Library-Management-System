import { Body, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { UUID_VERSION } from 'src/config';
import { BaseController } from './base.controller';
import { CoreFindManyOptions, CoreFindOneOptions } from '../types';

export abstract class CoreController extends BaseController {
  /**
   * @description Create a new instance of the entity.
   * @param createDto The data to be used to create the new instance.
   * Just pass the [createDto] to be validated by the global validation pipe.
   * No need to re-write the [Body] decorator on the child controllers.
   * @returns The newly created instance.
   */
  protected async create(@Body() createDto: object) {
    const instance = await this.service.create(createDto);
    return this.serialize(instance);
  }

  /**
   * @description Find all instances of the entity.
   * @param filterDto The data to be used to filter the instances.
   * Just pass the [filterDto] to be validated by the global validation pipe.
   * No need to re-write the [Query] decorator on the child controllers.
   * @param paginate A flag to determine if the instances will be paginated or not.
   * @param options The options to be used to find the instances.
   * @returns All filtered instances of the entity.
   */
  protected async findAll(
    @Query() filterDto: object,
    paginate = true,
    options: CoreFindManyOptions = {},
  ) {
    /* Setting the pagination, filtering, sorting options to be used to find the instances. */
    this.handleFindAllOptions(filterDto, paginate, options);

    /* Finding the instances. */
    const count = await this.service.getCount(options);
    const page = await this.paginate(count, options, this.service);
    if (page !== null) {
      const serializedPage = this.serialize(page);
      return this.getFindAllPaginatedResponse(
        { count },
        options,
        serializedPage,
      );
    }

    const instances = await this.service.findAll(options);
    const serializedInstances = this.serialize(instances);
    return this.getFindAllResponse({ count }, serializedInstances);
  }

  /**
   * @description Find one instance of the entity by its id.
   * @param id The id of the instance to be found.
   * Just pass the [id] to be validated by the global validation pipe.
   * No need to re-write the [Param] decorator on the child controllers.
   * @param options The options to be used to find the instance.
   * @returns The found instance.
   */
  protected async findOne(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    options: CoreFindOneOptions = {},
  ) {
    const instance = await this.service.findOne(id, options);
    return this.serialize(instance);
  }

  /**
   * @description Update an instance of the entity by its id.
   * @param id The id of the instance to be updated.
   * @param updateDto The data to be used to update the instance.
   * Just pass the [id & updateDto] to be validated by the global validation pipe.
   * No need to re-write the [Param & Body] decorators on the child controllers.
   * @returns The updated instance.
   */
  protected async update(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateDto: object,
  ) {
    const instance = await this.service.update(id, updateDto);
    return this.serialize(instance);
  }

  /**
   * @description Partially Update an instance of the entity by its id.
   * @param id The id of the instance to be updated.
   * @param updateDto The data to be used to update the instance.
   * Just pass the [id & updateDto] to be validated by the global validation pipe.
   * No need to re-write the [Param & Body] decorators on the child controllers.
   * @returns The updated instance.
   */
  protected async updatePartial(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    @Body() updateDto: object,
  ) {
    const instance = await this.service.updatePartial(id, updateDto);
    return this.serialize(instance);
  }

  /**
   * @description Remove an instance of the entity by its id.
   * @param id The id of the instance to be removed.
   * @param softDelete A flag to determine if the instance will be soft deleted or not.
   * Just pass the [id] to be validated by the global validation pipe.
   * No need to re-write the [Param] decorator on the child controllers.
   * @returns Void.
   */
  protected async remove(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    softDelete: boolean = false,
  ) {
    return await this.service.remove(id, softDelete);
  }
}
