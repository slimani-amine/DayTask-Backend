"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711375564043 = void 0;
class Migrations1711375564043 {
    constructor() {
        this.name = 'Migrations1711375564043';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "projectIdId" TO "projectId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "projectId" TO "projectIdId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127" FOREIGN KEY ("projectIdId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.Migrations1711375564043 = Migrations1711375564043;
//# sourceMappingURL=1711375564043-migrations.js.map