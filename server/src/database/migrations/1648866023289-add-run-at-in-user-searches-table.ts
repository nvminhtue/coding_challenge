import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRunAtInUserSearchesTable1648866023289 implements MigrationInterface {
	name = 'addRunAtInUserSearchesTable1648866023289'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_searches" ADD "run_at" TIMESTAMP NOT NULL DEFAULT now()`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user_searches" DROP COLUMN "run_at"`);
	}
}
