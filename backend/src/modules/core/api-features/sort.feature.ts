import { ISortFeature } from '../interfaces/sort.interface';
import { SortType } from '../types';

export class SortFeature implements ISortFeature {
  public generateSortOptions(sortFields: string | undefined): SortType {
    const sortOptions: SortType = {};
    if (!sortFields) return sortOptions;

    const fields = sortFields.split(',');
    fields.forEach((field) => {
      if (field.startsWith('-')) {
        sortOptions[field.substring(1)] = 'DESC';
      } else if (field.length > 0) {
        // For the edge case when the sort field is ended with a comma.
        sortOptions[field] = 'ASC';
      }
    });
    return sortOptions;
  }
}
