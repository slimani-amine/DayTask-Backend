"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1711103075092 = void 0;
class Migrations1711103075092 {
    constructor() {
        this.name = 'Migrations1711103075092';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "title" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "title" character varying NOT NULL`);
    }
}
exports.Migrations1711103075092 = Migrations1711103075092;
//# sourceMappingURL=1711103075092-migrations.js.map