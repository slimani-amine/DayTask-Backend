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
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = __importDefault(require("../database/config/database.config"));
const relational_persistence_module_1 = require("./infastructure/persistence/relational/relational-persistence.module");
const notifications_controller_1 = require("./notifications.controller");
const notifications_service_1 = require("./notifications.service");
const users_module_1 = require("../users/users.module");
const notifications_socket_module_1 = require("./socket/notifications-socket.module");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? class DocumentNotificationPersistenceModule {
    }
    : relational_persistence_module_1.RelationalNotificationPersistenceModule;
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            infrastructurePersistenceModule,
            users_module_1.UsersModule,
            notifications_socket_module_1.NotificationsSocketModule,
        ],
        controllers: [notifications_controller_1.NotificationController],
        providers: [notifications_service_1.NotificationService],
        exports: [notifications_service_1.NotificationService, infrastructurePersistenceModule],
    })
], NotificationModule);
//# sourceMappingURL=notifications.module.js.map