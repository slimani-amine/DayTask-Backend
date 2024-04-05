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
exports.CreateMessageDto = exports.IsChatConstraint = exports.IsMessageType = void 0;
const class_validator_1 = require("class-validator");
const message_1 = require("../domain/message");
const chat_1 = require("../../chat/domain/chat");
const swagger_1 = require("@nestjs/swagger");
let IsMessageType = class IsMessageType {
    validate(value) {
        return Object.values(message_1.MessageTypes).includes(value);
    }
    defaultMessage() {
        return `Type must be a valid MessageType value (${Object.values(message_1.MessageTypes)})`;
    }
};
exports.IsMessageType = IsMessageType;
exports.IsMessageType = IsMessageType = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isMessageType", async: false })
], IsMessageType);
let IsChatConstraint = class IsChatConstraint {
    validate(chat) {
        return chat && typeof chat.id === "number";
    }
    defaultMessage() {
        return "Each chat must be a user object with a numeric id";
    }
};
exports.IsChatConstraint = IsChatConstraint;
exports.IsChatConstraint = IsChatConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsChatConstraint", async: false })
], IsChatConstraint);
class CreateMessageDto {
    constructor() {
        this.seen = false;
    }
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Good morning" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(IsMessageType),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Validate)(IsChatConstraint),
    __metadata("design:type", chat_1.Chat)
], CreateMessageDto.prototype, "chat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMessageDto.prototype, "seen", void 0);
//# sourceMappingURL=create-message.dto.js.map