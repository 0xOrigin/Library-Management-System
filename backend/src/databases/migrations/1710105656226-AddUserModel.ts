import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserModel1710105656226 implements MigrationInterface {
    name = 'AddUserModel1710105656226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deletedAt" TIMESTAMP WITH TIME ZONE,
                "firstName" character varying,
                "lastName" character varying,
                "username" character varying(30) NOT NULL,
                "email" character varying(50) NOT NULL,
                "password" character varying NOT NULL,
                "picture" character varying,
                "phoneNumber" character varying,
                "address" character varying,
                "city" character varying,
                "registrationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "isActive" boolean NOT NULL DEFAULT true,
                "isAdmin" boolean NOT NULL DEFAULT false,
                "role" character varying NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
