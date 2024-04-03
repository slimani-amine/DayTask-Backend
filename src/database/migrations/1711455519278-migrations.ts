import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711455519278 implements MigrationInterface {
  name = 'Migrations1711455519278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."message_type_enum" AS ENUM('text', 'image', 'file', 'video', 'audio')`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "content" text NOT NULL, "type" "public"."message_type_enum" NOT NULL, "seen" boolean NOT NULL DEFAULT false, "senderId" integer, "chatId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
    await queryRunner.query(
      `ALTER TABLE "file" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "file" ADD "deletedAt" TIMESTAMP`);
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
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_bc096b4e18b1f9508197cd98066"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "createdAt"`);
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
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TYPE "public"."message_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
