import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBorrowingProcessModel1710156567720 implements MigrationInterface {
    name = 'AddBorrowingProcessModel1710156567720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "borrowing_process" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "user" uuid NOT NULL,
                "book" uuid NOT NULL,
                "checkoutAt" TIMESTAMP WITH TIME ZONE NOT NULL,
                "dueDate" TIMESTAMP WITH TIME ZONE NOT NULL,
                "returnedAt" TIMESTAMP WITH TIME ZONE,
                "userId" uuid,
                "bookId" uuid,
                CONSTRAINT "PK_0c27574178b1f7ec548ddc1bbc0" PRIMARY KEY ("id", "user", "book")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "borrowing_process"
            ADD CONSTRAINT "FK_5d8df186a96c7c4eee0161e723d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "borrowing_process"
            ADD CONSTRAINT "FK_7f4d507e059ea04d719bd63cc3d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "borrowing_process" DROP CONSTRAINT "FK_7f4d507e059ea04d719bd63cc3d"
        `);
        await queryRunner.query(`
            ALTER TABLE "borrowing_process" DROP CONSTRAINT "FK_5d8df186a96c7c4eee0161e723d"
        `);
        await queryRunner.query(`
            DROP TABLE "borrowing_process"
        `);
    }

}
