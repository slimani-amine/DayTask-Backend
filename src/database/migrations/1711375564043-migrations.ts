import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711375564043 implements MigrationInterface {
  name = 'Migrations1711375564043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" RENAME COLUMN "projectIdId" TO "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" RENAME COLUMN "projectId" TO "projectIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127" FOREIGN KEY ("projectIdId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
