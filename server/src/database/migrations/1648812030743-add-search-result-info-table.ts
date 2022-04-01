import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchResultInfoTable1648812030743 implements MigrationInterface {
  name = 'addSearchResultInfoTable1648812030743'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "search_results" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "updated" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "created" TIMESTAMP(3) NOT NULL DEFAULT now(),
        "deleted" TIMESTAMP(3), "user_search_id" uuid NOT NULL,
        "adword_total" smallint NOT NULL,
        "link_total" smallint NOT NULL,
        "search_found" character varying(255) NOT NULL,
        "preview" text NOT NULL,
        CONSTRAINT "REL_750f27a58f9f9cb95aab375d7b"
        UNIQUE ("user_search_id"),
        CONSTRAINT "PK_6557776eaad0d49fad340bdb49c" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "search_results"
      ADD CONSTRAINT "FK_750f27a58f9f9cb95aab375d7ba"
      FOREIGN KEY ("user_search_id")
      REFERENCES "user_searches"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "search_results" DROP CONSTRAINT "FK_750f27a58f9f9cb95aab375d7ba"`);
    await queryRunner.query(`DROP TABLE "search_results"`);
  }

}
