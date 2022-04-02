import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeRunAtInUserSearchesTableIntoTimestampWithTimezone1648909468962
  implements MigrationInterface {
  name = 'changeRunAtInUserSearchesTableIntoTimestampWithTimezone1648909468962'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_searches" DROP COLUMN "run_at"`);
    await queryRunner.query(`ALTER TABLE "user_searches" ADD "run_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_searches" DROP COLUMN "run_at"`);
    await queryRunner.query(`ALTER TABLE "user_searches" ADD "run_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
