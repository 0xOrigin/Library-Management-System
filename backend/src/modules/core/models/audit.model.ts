import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index } from "typeorm";
import { Core } from "./core.model";

export abstract class Audit extends Core {

    @CreateDateColumn({ type: 'timestamp with time zone', nullable: false, update: false })
    @Index()
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, insert: false, default: null })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true, default: null })
    @Index()
    deletedAt: Date;

}
