export const TypeORMOperators = {
  EQUALS: 'eq',
  NOT_EQUALS: 'neq',
  IN: 'in',
  NOT_IN: 'nin',
  IS_NULL: 'isnull',
  IS_NOT_NULL: 'isnotnull',
  LIKE: 'like',
  NOT_LIKE: 'nlike',
  ILIKE: 'ilike',
  NOT_ILIKE: 'nilike',
  GREATER_THAN: 'gt',
  GREATER_THAN_OR_EQUAL: 'gte',
  LESS_THAN: 'lt',
  LESS_THAN_OR_EQUAL: 'lte',
  BETWEEN: 'between',
  NOT_BETWEEN: 'notbetween',
} as const;

export type TypeORMOperatorsType = typeof TypeORMOperators[keyof typeof TypeORMOperators];
