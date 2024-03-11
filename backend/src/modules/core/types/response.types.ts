export type MetaOptions = {
  count: number;
};

export type PaginationOptions = {
  prev: number | null;
  next: number | null;
  last: number | null;
};

export type ResponseType = {
  meta: MetaOptions;
  data: any[];
};

export type PaginatedResponseType = {
  meta: MetaOptions;
  pagination: PaginationOptions;
  data: any[];
};
