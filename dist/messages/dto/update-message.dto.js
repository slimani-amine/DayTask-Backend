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
exports.UpdateMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_message_dto_1 = require("./create-message.dto");
const class_transformer_1 = require("class-transformer");
const message_1 = require("../domain/message");
const chat_1 = require("../../chat/domain/chat");
const user_1 = require("../../users/domain/user");
class UpdateMessageDto extends (0, swagger_1.PartialType)(create_message_dto_1.CreateMessageDto) {
}
exports.UpdateMessageDto = UpdateMessageDto;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], UpdateMessageDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", chat_1.Chat)
], UpdateMessageDto.prototype, "chat", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", user_1.User)
], UpdateMessageDto.prototype, "sender", void 0);
//# sourceMappingURL=update-message.dto.js.map