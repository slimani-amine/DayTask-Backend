"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711361872939 = void 0;
class Migrations1711361872939 {
    constructor() {
        this.name = 'Migrations1711361872939';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "due_date" TIMESTAMP, "completed" boolean NOT NULL DEFAULT false, "completedAt" TIMESTAMP, "startedAt" TIMESTAMP DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_members_user" ("taskId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9d1d3bc0912164872968fec341e" PRIMARY KEY ("taskId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_582e5ac9bec3f87756dc96dc5a" ON "task_members_user" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a594d443e3dd4fc70a67d3849b" ON "task_members_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "task_members_user" ADD CONSTRAINT "FK_582e5ac9bec3f87756dc96dc5a7" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_members_user" ADD CONSTRAINT "FK_a594d443e3dd4fc70a67d3849b1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task_members_user" DROP CONSTRAINT "FK_a594d443e3dd4fc70a67d3849b1"`);
        await queryRunner.query(`ALTER TABLE "task_members_user" DROP CONSTRAINT "FK_582e5ac9bec3f87756dc96dc5a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a594d443e3dd4fc70a67d3849b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_582e5ac9bec3f87756dc96dc5a"`);
        await queryRunner.query(`DROP TABLE "task_members_user"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }
}
exports.Migrations1711361872939 = Migrations1711361872939;
//# sourceMappingURL=1711361872939-migrations.js.map