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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../../auth/constants/response");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const Message_service_1 = require("./Message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const query_message_dto_1 = require("./dto/query-message.dto");
const update_message_dto_1 = require("./dto/update-message.dto");
const chat_service_1 = require("../chat/chat.service");
const user_decorator_1 = require("../../shared/decorators/user.decorator");
const user_1 = require("../users/domain/user");
const messages_socket_gateway_1 = require("./socket/messages-socket.gateway");
const infinity_pagination_1 = require("../../utils/infinity-pagination");
const swagger_1 = require("@nestjs/swagger");
let MessageController = class MessageController {
    constructor(msgService, chatService, msgSocket) {
        this.msgService = msgService;
        this.chatService = chatService;
        this.msgSocket = msgSocket;
    }
    async create(createDto, user) {
        const msg = await this.msgService.create(createDto, user.id);
        this.msgSocket.emitCreate(msg);
        return msg;
    }
    async findAll(chatId, query, user) {
        const page = query?.page ?? 1;
        const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
        const chat = await this.chatService.findOne(chatId, user.id);
        if (!chat) {
            throw new common_1.BadRequestException('Chat not found');
        }
        try {
            const data = (0, infinity_pagination_1.infinityPagination)(await this.msgService.findAll({
                filterOptions: query?.filters ?? null,
                sortOptions: query?.sort ?? null,
                paginationOptions: {
                    page,
                    limit,
                },
                chatId: chatId,
            }), { page, limit });
            return data;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async update(id, updateTasktDto) {
        const msg = await this.msgService.update(id, updateTasktDto);
        if (msg) {
            this.msgSocket.emitUpdate(msg);
        }
        return msg;
    }
    async remove(id) {
        await this.msgService.remove(id);
        return {
            ...response_1.successResponse,
        };
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':chatId'),
    __param(0, (0, common_1.Param)('chatId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_message_dto_1.QueryMessageDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "remove", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'messages', version: '1' }),
    __metadata("design:paramtypes", [Message_service_1.MessageService,
        chat_service_1.ChatService,
        messages_socket_gateway_1.MessagesSocketGateway])
], MessageController);
//# sourceMappingURL=Message.controller.js.map