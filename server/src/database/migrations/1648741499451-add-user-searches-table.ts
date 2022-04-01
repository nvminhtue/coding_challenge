import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSearchesTable1648741499451 implements MigrationInterface {
  name = 'addUserSearchesTable1648741499451'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_searches" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "updated" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "created" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "deleted" TIMESTAMP(3), "user_id" uuid NOT NULL,
        "search_value" character varying(10000) NOT NULL,
        "status" smallint NOT NULL DEFAULT '0',
        CONSTRAINT "PK_7c02c136d33604d6add483d34af" PRIMARY KEY ("id")
      )`
    );
    await queryRunner.query(
      `ALTER TABLE "user_searches"
        ADD CONSTRAINT "FK_c5e85a562a77219e953db89c882"
        FOREIGN KEY ("user_id")
        REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_searches" DROP CONSTRAINT "FK_c5e85a562a77219e953db89c882"`);
    await queryRunner.query(`DROP TABLE "user_searches"`);
  }
}
