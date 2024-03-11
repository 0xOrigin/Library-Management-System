import { IPaginationFeature } from '../interfaces/pagination.interface';
import { ISortFeature } from '../interfaces/sort.interface';
import { IFilterFeature } from '../interfaces/filter.interface';
import { IResponseShapeFeature } from '../interfaces/response-shape.interface';
import { ISerializationFeature } from '../interfaces/serialization.interface';

export type BaseControllerOptions = {
  paginationFeature?: IPaginationFeature;

  sortFeature?: ISortFeature;
  
  filterFeature?: IFilterFeature;
  
  responseShapeFeature?: IResponseShapeFeature;
  
  serializationFeature?: ISerializationFeature;
};
