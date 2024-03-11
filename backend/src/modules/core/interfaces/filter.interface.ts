export interface IFilterFeature {
  generateFilterOptions(filterDto: object, excludeFields: string[]): object;
}
