"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711537543650 = void 0;
class Migrations1711537543650 {
    constructor() {
        this.name = 'Migrations1711537543650';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`CREATE TABLE "notification" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" SERIAL NOT NULL, "content" text NOT NULL, "seen" boolean NOT NULL DEFAULT false, "senderId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_receivers_user" ("notificationId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_dae974f2263439724e1b37747c5" PRIMARY KEY ("notificationId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca091cd6fcfc7b55d83cf306bf" ON "notification_receivers_user" ("notificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7dfd3dd996e06fe47828d1c93d" ON "notification_receivers_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "task" ADD "due_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_c0af34102c13c654955a0c5078b" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_receivers_user" ADD CONSTRAINT "FK_ca091cd6fcfc7b55d83cf306bfc" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_receivers_user" ADD CONSTRAINT "FK_7dfd3dd996e06fe47828d1c93db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "notification_receivers_user" DROP CONSTRAINT "FK_7dfd3dd996e06fe47828d1c93db"`);
        await queryRunner.query(`ALTER TABLE "notification_receivers_user" DROP CONSTRAINT "FK_ca091cd6fcfc7b55d83cf306bfc"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_c0af34102c13c654955a0c5078b"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "startedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD "startedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ADD "due_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "description" text`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dfd3dd996e06fe47828d1c93d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca091cd6fcfc7b55d83cf306bf"`);
        await queryRunner.query(`DROP TABLE "notification_receivers_user"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Migrations1711537543650 = Migrations1711537543650;
//# sourceMappingURL=1711537543650-migrations.js.map