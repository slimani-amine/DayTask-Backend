"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const relational_persistence_module_1 = require("./infastructure/persistence/relational/relational-persistence.module");
const database_config_1 = __importDefault(require("../../database/config/database.config"));
const projects_module_1 = require("../projects/projects.module");
const users_module_1 = require("../users/users.module");
const vlalidate_data_1 = require("../../utils/validation/vlalidate-data");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? class DocumentChatPersistenceModule {
    }
    : relational_persistence_module_1.RelationalTaskPersistenceModule;
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructurePersistenceModule, projects_module_1.ProjectsModule, users_module_1.UsersModule],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService, vlalidate_data_1.ValidateData],
        exports: [tasks_service_1.TasksService, infrastructurePersistenceModule],
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map