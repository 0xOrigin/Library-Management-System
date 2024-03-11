import { FindManyOptions } from "typeorm";

export type CoreFindManyOptions = Omit<FindManyOptions, 'take' | 'skip' | 'withDeleted'>;
