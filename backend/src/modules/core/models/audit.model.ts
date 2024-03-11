import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Core } from "./core.model";

export abstract class Audit extends Core {

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, update: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, insert: false, default: null })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, default: null })
    deletedAt: Date;

}
