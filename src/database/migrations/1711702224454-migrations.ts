import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711702224454 implements MigrationInterface {
  name = 'Migrations1711702224454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "description" text`);
    await queryRunner.query(`ALTER TABLE "task" ADD "due_date" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "completedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "startedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "startedAt" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "completedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "due_date" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "task" ADD "description" text`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
