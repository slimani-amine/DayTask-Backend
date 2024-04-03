"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711365108156 = void 0;
class Migrations1711365108156 {
    constructor() {
        this.name = 'Migrations1711365108156';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ADD "projectIdId" integer`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127" FOREIGN KEY ("projectIdId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_e8f638249f4b478ecd9b2a66127"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectIdId"`);
    }
}
exports.Migrations1711365108156 = Migrations1711365108156;
//# sourceMappingURL=1711365108156-migrations.js.map