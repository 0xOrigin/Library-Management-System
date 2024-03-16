import { Index, PrimaryGeneratedColumn } from "typeorm";

export abstract class Core {

    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

}
