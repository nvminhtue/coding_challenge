import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenInUserTable1648528539002 implements MigrationInterface {
  name = 'addRefreshTokenInUserTable1648528539002'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
  }
}
