import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711100363642 implements MigrationInterface {
  name = 'Migrations1711100363642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "due_date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_members_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_72827104fc2fdddc050b4064da1" PRIMARY KEY ("projectId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c79bdce48cf47ff04f1ec3a8ca" ON "project_members_user" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66c5703c0321bafc7c9352098b" ON "project_members_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members_user" ADD CONSTRAINT "FK_c79bdce48cf47ff04f1ec3a8ca5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members_user" ADD CONSTRAINT "FK_66c5703c0321bafc7c9352098b5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_members_user" DROP CONSTRAINT "FK_66c5703c0321bafc7c9352098b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members_user" DROP CONSTRAINT "FK_c79bdce48cf47ff04f1ec3a8ca5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66c5703c0321bafc7c9352098b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c79bdce48cf47ff04f1ec3a8ca"`,
    );
    await queryRunner.query(`DROP TABLE "project_members_user"`);
    await queryRunner.query(`DROP TABLE "project"`);
  }
}
