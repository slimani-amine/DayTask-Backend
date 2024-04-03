"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711459529319 = void 0;
class Migrations1711459529319 {
    constructor() {
        this.name = 'Migrations1711459529319';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
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
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
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
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Migrations1711459529319 = Migrations1711459529319;
//# sourceMappingURL=1711459529319-migrations.js.map