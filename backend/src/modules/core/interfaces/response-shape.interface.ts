import { MetaOptions, ResponseType } from "../types";

export interface IResponseShapeFeature {
  getFindAllResponse(
    metaOptions: MetaOptions,
    data: any[],
  ): ResponseType;
}
