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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notifications_repository_1 = require("./infastructure/persistence/notifications.repository");
const users_service_1 = require("../users/users.service");
let NotificationService = class NotificationService {
    constructor(notificationRepo, userService) {
        this.notificationRepo = notificationRepo;
        this.userService = userService;
    }
    async create(createPayload, user_id) {
        const validationPromises = createPayload.receivers.map((e) => this.userService.validateUser(e.id));
        await Promise.all(validationPromises);
        try {
            const created = await this.notificationRepo.create({
                ...createPayload,
                sender: { id: user_id },
            });
            return created;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, userId, }) {
        return this.notificationRepo.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
            userId,
        });
    }
    async update(id, updatePayload) {
        try {
            const updated = await this.notificationRepo.update(id, updatePayload);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    id: 'Notification doesnt exist',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async remove(id) {
        await this.notificationRepo.softDelete(id);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_repository_1.NotificationsRepository,
        users_service_1.UsersService])
], NotificationService);
//# sourceMappingURL=notifications.service.js.map