import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAttemptsMadeColumnUserSearchesTable1648786848117 implements MigrationInterface {
  name = 'addAttemptsMadeColumnUserSearchesTable1648786848117'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_searches" ADD "attempts_made" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_searches" DROP COLUMN "attempts_made"`);
  }
}
