"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalTaskPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_repository_1 = require("./repositories/tasks.repository");
const tasks_repository_2 = require("../tasks.repository");
const task_entity_1 = require("./entities/task.entity");
let RelationalTaskPersistenceModule = class RelationalTaskPersistenceModule {
};
exports.RelationalTaskPersistenceModule = RelationalTaskPersistenceModule;
exports.RelationalTaskPersistenceModule = RelationalTaskPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([task_entity_1.TaskEntity])],
        providers: [
            {
                provide: tasks_repository_2.TaskRepository,
                useClass: tasks_repository_1.TaskRelationalRepository,
            },
        ],
        exports: [tasks_repository_2.TaskRepository],
    })
], RelationalTaskPersistenceModule);
//# sourceMappingURL=relational-persistence.module.js.map