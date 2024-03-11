import { IResponseShapeFeature } from '../interfaces/response-shape.interface';
import { MetaOptions, ResponseType } from '../types';

export class ResponseShapeFeature implements IResponseShapeFeature {
  public getFindAllResponse(
    metaOptions: MetaOptions,
    data: any[],
  ): ResponseType {
    return {
      meta: {
        ...metaOptions,
      },
      data,
    };
  }
}
