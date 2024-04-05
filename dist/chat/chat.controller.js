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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../auth/constants/response");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const chat_service_1 = require("./chat.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const query_chat_dto_1 = require("./dto/query-chat.dto");
const update_chat_dto_1 = require("./dto/update-chat.dto");
const user_decorator_1 = require("../shared/decorators/user.decorator");
const user_1 = require("../users/domain/user");
const swagger_1 = require("@nestjs/swagger");
const infinity_pagination_1 = require("../utils/infinity-pagination");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    create(createDto, user) {
        return this.chatService.create(createDto, user.id);
    }
    async findAll(query, user) {
        const page = query?.page ?? 1;
        const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
        try {
            const data = (0, infinity_pagination_1.infinityPagination)(await this.chatService.findAll({
                filterOptions: query?.filters ?? null,
                sortOptions: query?.sort ?? null,
                paginationOptions: {
                    page,
                    limit,
                },
                userId: user.id,
            }), { page, limit });
            return data;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    findOne(id, user) {
        return this.chatService.findOne(id, user.id);
    }
    update(id, updateTasktDto) {
        return this.chatService.update(id, updateTasktDto);
    }
    async remove(id) {
        await this.chatService.remove(id);
        return {
            ...response_1.successResponse,
        };
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDto, user_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_chat_dto_1.QueryChatDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.User]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_chat_dto_1.UpdateChatDto]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "remove", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)("chat"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: "chat", version: "1" }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
//# sourceMappingURL=chat.controller.js.map