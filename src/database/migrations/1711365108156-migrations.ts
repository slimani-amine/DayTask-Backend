import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711365108156 implements MigrationInterface {
  name = 'Migrations1711365108156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "projectIdId" integer`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127" FOREIGN KEY ("projectIdId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectIdId"`);
  }
}
