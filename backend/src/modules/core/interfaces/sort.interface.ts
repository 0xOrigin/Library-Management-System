import { SortType } from "../types";

export interface ISortFeature {
  generateSortOptions(sortFields: string | undefined): SortType,
}
