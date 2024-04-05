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
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const Message_service_1 = require("./Message.service");
const Message_controller_1 = require("./Message.controller");
const database_config_1 = __importDefault(require("../database/config/database.config"));
const relational_persistence_module_1 = require("./infastructure/persistence/relational/relational-persistence.module");
const chat_module_1 = require("../chat/chat.module");
const messages_socket_module_1 = require("./socket/messages-socket.module");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? class DocumentMessagePersistenceModule {
    }
    : relational_persistence_module_1.RelationalMessagePersistenceModule;
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructurePersistenceModule, chat_module_1.ChatModule, messages_socket_module_1.MessagesSocketModule],
        controllers: [Message_controller_1.MessageController],
        providers: [Message_service_1.MessageService],
        exports: [Message_service_1.MessageService, infrastructurePersistenceModule],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map