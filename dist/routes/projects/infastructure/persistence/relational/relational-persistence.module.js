"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalProjectPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_repository_1 = require("./repositories/projects.repository");
const projects_repository_2 = require("../projects.repository");
const project_entity_1 = require("./entities/project.entity");
let RelationalProjectPersistenceModule = class RelationalProjectPersistenceModule {
};
exports.RelationalProjectPersistenceModule = RelationalProjectPersistenceModule;
exports.RelationalProjectPersistenceModule = RelationalProjectPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity])],
        providers: [
            {
                provide: projects_repository_2.ProjectRepository,
                useClass: projects_repository_1.ProjectRelationalRepository,
            },
        ],
        exports: [projects_repository_2.ProjectRepository],
    })
], RelationalProjectPersistenceModule);
//# sourceMappingURL=relational-persistence.module.js.map