"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const general_entity_1 = require("../../../../../shared/entities/general.entity");
const user_entity_1 = require("../../../../../users/infrastructure/persistence/relational/entities/user.entity");
const typeorm_1 = require("typeorm");
const message_1 = require("../../../../domain/message");
const chat_entity_1 = require("../../../../../chat/infastructure/persistence/relational/entities/chat.entity");
let MessageEntity = class MessageEntity extends general_entity_1.GeneralEntity {
};
exports.MessageEntity = MessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], MessageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, {
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: message_1.MessageTypes }),
    __metadata("design:type", String)
], MessageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], MessageEntity.prototype, "seen", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chat_entity_1.ChatEntity, {
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", chat_entity_1.ChatEntity)
], MessageEntity.prototype, "chat", void 0);
exports.MessageEntity = MessageEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: "message",
    })
], MessageEntity);
//# sourceMappingURL=message.entity.js.map