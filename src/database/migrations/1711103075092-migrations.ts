import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711103075092 implements MigrationInterface {
  name = 'Migrations1711103075092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "project" ADD "title" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "title" character varying NOT NULL`,
    );
  }
}
