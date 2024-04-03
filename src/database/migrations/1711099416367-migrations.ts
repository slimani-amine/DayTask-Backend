import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711099416367 implements MigrationInterface {
  name = 'Migrations1711099416367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "due_date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects_members_user" ("projectsId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_15211057388e8755c88bfca9b62" PRIMARY KEY ("projectsId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e7c8cffb774447170caa8f2d43" ON "projects_members_user" ("projectsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a044e585b5ce748a525fcb498f" ON "projects_members_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_members_user" ADD CONSTRAINT "FK_e7c8cffb774447170caa8f2d43c" FOREIGN KEY ("projectsId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_members_user" ADD CONSTRAINT "FK_a044e585b5ce748a525fcb498f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "projects_members_user" DROP CONSTRAINT "FK_a044e585b5ce748a525fcb498f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "projects_members_user" DROP CONSTRAINT "FK_e7c8cffb774447170caa8f2d43c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a044e585b5ce748a525fcb498f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e7c8cffb774447170caa8f2d43"`,
    );
    await queryRunner.query(`DROP TABLE "projects_members_user"`);
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
