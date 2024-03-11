import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookModel1710152524029 implements MigrationInterface {
    name = 'AddBookModel1710152524029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "title" character varying(150) NOT NULL,
                "author" character varying(150) NOT NULL,
                "isbn" character varying(100) NOT NULL,
                "availableQuantity" integer NOT NULL,
                "shelfLocation" character varying(200) NOT NULL,
                CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title"),
                CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"),
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "book"
        `);
    }

}
