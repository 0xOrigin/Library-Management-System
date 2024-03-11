import { FindOneOptions } from "typeorm";

export type FindOneOptionsWhereOmitted = Omit<FindOneOptions, 'where'>;
export type CoreFindOneOptions = Omit<FindOneOptions, 'where' | 'select' | 'relations'>;
