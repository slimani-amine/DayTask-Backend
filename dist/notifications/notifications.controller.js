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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const response_1 = require("../auth/constants/response");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const user_decorator_1 = require("../shared/decorators/user.decorator");
const user_1 = require("../users/domain/user");
const notifications_service_1 = require("./notifications.service");
const create_notifications_dto_1 = require("./dto/create-notifications.dto");
const query_notifications_dto_1 = require("./dto/query-notifications.dto");
const update_notifications_dto_1 = require("./dto/update-notifications.dto");
const notifications_socket_gateway_1 = require("./socket/notifications-socket.gateway");
const infinity_pagination_1 = require("../utils/infinity-pagination");
const swagger_1 = require("@nestjs/swagger");
let NotificationController = class NotificationController {
    constructor(notificationService, notifSocket) {
        this.notificationService = notificationService;
        this.notifSocket = notifSocket;
    }
    async create(createDto, user) {
        const notif = await this.notificationService.create(createDto, user.id);
        this.notifSocket.emitCreate(notif);
        return this.notificationService.create(createDto, user.id);
    }
    async findAll(query, user) {
        const page = query?.page ?? 1;
        const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
        try {
            const data = (0, infinity_pagination_1.infinityPagination)(await this.notificationService.findAll({
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
    async update(id, updateTasktDto) {
        const notif = await this.notificationService.update(id, updateTasktDto);
        if (notif) {
            this.notifSocket.emitUpdate(notif);
        }
        return notif;
    }
    async remove(id) {
        await this.notificationService.remove(id);
        return {
            ...response_1.successResponse,
        };
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notifications_dto_1.CreateNotificationsDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_notifications_dto_1.QueryNotificationsDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_notifications_dto_1.UpdateNotificationsDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "remove", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)("notifications"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: "notifications", version: "1" }),
    __metadata("design:paramtypes", [notifications_service_1.NotificationService,
        notifications_socket_gateway_1.NotificationsSocketGateway])
], NotificationController);
//# sourceMappingURL=notifications.controller.js.map