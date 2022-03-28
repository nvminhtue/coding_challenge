import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1648459576722 implements MigrationInterface {
  name = 'addUserTable1648459576722'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "updated" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "created" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "deleted" TIMESTAMP(3), "name" character varying(255) NOT NULL,
        "username" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
