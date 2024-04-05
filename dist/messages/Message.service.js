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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const Message_repository_1 = require("./infastructure/persistence/Message.repository");
const chat_service_1 = require("../chat/chat.service");
let MessageService = class MessageService {
    constructor(msgRepository, chatService) {
        this.msgRepository = msgRepository;
        this.chatService = chatService;
    }
    async create(createPayload, user_id) {
        await this.validateChat(createPayload.chat.id, user_id);
        try {
            const created = await this.msgRepository.create({
                ...createPayload,
                sender: { id: user_id },
            });
            return created;
        }
        catch (err) {
            console.log("🚀 ~ MessageService ~ err:", err);
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, chatId, }) {
        return this.msgRepository.findManyWithPagination({
            filterOptions: { ...filterOptions, chat: { id: chatId } },
            sortOptions,
            paginationOptions,
        });
    }
    async update(id, updatePayload) {
        try {
            const updated = await this.msgRepository.update(id, updatePayload);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    id: "Task doesnt exist",
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async remove(id) {
        await this.msgRepository.softDelete(id);
    }
    async validateChat(chatId, userId) {
        const chat = await this.chatService.findOne(chatId, userId);
        if (!chat) {
            throw new common_1.BadRequestException(`Chat with id ${chatId} not found`);
        }
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Message_repository_1.MessageRepository,
        chat_service_1.ChatService])
], MessageService);
//# sourceMappingURL=Message.service.js.map