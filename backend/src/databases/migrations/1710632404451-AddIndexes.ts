import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexes1710632404451 implements MigrationInterface {
    name = 'AddIndexes1710632404451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_a3afef72ec8f80e6e5c310b28a" ON "book" ("id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_87ed05ff78316edaaa3930870d" ON "book" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_868ed7be596d893218dcf2b675" ON "book" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c10a44a29ef231062f22b1b7ac" ON "book" ("title")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_bd183604b9c828c0bdd92cafab" ON "book" ("isbn")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_964452f3ed162fbbee118c097f" ON "borrowing_process" ("id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_119afd7a002a7edd97c31e73bc" ON "borrowing_process" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_38973392b88aee7842e6fa8003" ON "borrowing_process" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2f4c62ccddf901c47e23a41f5c" ON "borrowing_process" ("user")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4ce1fb5cbb9b8abd9f06dec68a" ON "borrowing_process" ("book")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_71695859ad20430de516699cde" ON "borrowing_process" ("checkoutAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c083acbfb624b1004437c130dc" ON "borrowing_process" ("dueDate")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_134008ea704afc5865e23c2a2b" ON "borrowing_process" ("returnedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_92f09bd6964a57bb87891a2acf" ON "user" ("deletedAt")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_92f09bd6964a57bb87891a2acf"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e11e649824a45d8ed01d597fd9"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_134008ea704afc5865e23c2a2b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c083acbfb624b1004437c130dc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_71695859ad20430de516699cde"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4ce1fb5cbb9b8abd9f06dec68a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2f4c62ccddf901c47e23a41f5c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_38973392b88aee7842e6fa8003"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_119afd7a002a7edd97c31e73bc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_964452f3ed162fbbee118c097f"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_bd183604b9c828c0bdd92cafab"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c10a44a29ef231062f22b1b7ac"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_868ed7be596d893218dcf2b675"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_87ed05ff78316edaaa3930870d"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a3afef72ec8f80e6e5c310b28a"
        `);
    }

}
