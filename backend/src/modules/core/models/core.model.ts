import { PrimaryGeneratedColumn } from "typeorm";

export abstract class Core {

    @PrimaryGeneratedColumn('uuid')
    id: string;

}
