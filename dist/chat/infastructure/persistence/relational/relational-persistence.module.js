"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalChatPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_entity_1 = require("./entities/chat.entity");
const chat_repository_1 = require("../chat.repository");
const chat_repository_2 = require("./repositories/chat.repository");
let RelationalChatPersistenceModule = class RelationalChatPersistenceModule {
};
exports.RelationalChatPersistenceModule = RelationalChatPersistenceModule;
exports.RelationalChatPersistenceModule = RelationalChatPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_entity_1.ChatEntity])],
        providers: [
            {
                provide: chat_repository_1.ChatRepository,
                useClass: chat_repository_2.ChatRelationalRepository,
            },
        ],
        exports: [chat_repository_1.ChatRepository],
    })
], RelationalChatPersistenceModule);
//# sourceMappingURL=relational-persistence.module.js.map