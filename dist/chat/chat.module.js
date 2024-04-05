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
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const database_config_1 = __importDefault(require("../database/config/database.config"));
const users_module_1 = require("../users/users.module");
const relational_persistence_module_1 = require("./infastructure/persistence/relational/relational-persistence.module");
const vlalidate_data_1 = require("../utils/validation/vlalidate-data");
const projects_module_1 = require("../projects/projects.module");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? class DocumentChatPersistenceModule {
    }
    : relational_persistence_module_1.RelationalChatPersistenceModule;
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructurePersistenceModule, projects_module_1.ProjectsModule, users_module_1.UsersModule],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, vlalidate_data_1.ValidateData],
        exports: [chat_service_1.ChatService, infrastructurePersistenceModule],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map