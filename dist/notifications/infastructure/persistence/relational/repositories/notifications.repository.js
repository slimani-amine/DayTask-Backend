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
exports.NotificationsRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notifications_entity_1 = require("../entities/notifications.entity");
const notifications_mapper_1 = require("../mappers/notifications.mapper");
let NotificationsRelationalRepository = class NotificationsRelationalRepository {
    constructor(notificationsRepo) {
        this.notificationsRepo = notificationsRepo;
    }
    async create(data) {
        const persistenceModel = notifications_mapper_1.NotificationsMapper.toPersistence(data);
        const newEntity = await this.notificationsRepo.save(this.notificationsRepo.create(persistenceModel));
        return notifications_mapper_1.NotificationsMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, userId, }) {
        const entities = await this.notificationsRepo
            .createQueryBuilder("notification")
            .innerJoinAndSelect("notification.receivers", "receiver", "receiver.id = :userId", { userId })
            .leftJoinAndSelect("notification.sender", "user")
            .skip((paginationOptions.page - 1) * paginationOptions.limit)
            .take(paginationOptions.limit)
            .where(filterOptions ?? {})
            .orderBy(sortOptions?.reduce((accumulator, sort) => ({
            ...accumulator,
            [`notification.${sort.orderBy}`]: sort.order,
        }), {}) ?? {})
            .getMany();
        return entities.map((user) => {
            if (user.hasOwnProperty("receivers")) {
                delete user.receivers;
            }
            return notifications_mapper_1.NotificationsMapper.toDomain(user);
        });
    }
    async findOne(fields) {
        const entity = await this.notificationsRepo.findOne({
            where: fields,
        });
        return entity ? notifications_mapper_1.NotificationsMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.notificationsRepo.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new common_1.BadRequestException("Notification not found");
        }
        const updatedEntity = await this.notificationsRepo.save(this.notificationsRepo.create(notifications_mapper_1.NotificationsMapper.toPersistence({
            ...notifications_mapper_1.NotificationsMapper.toDomain(entity),
            ...payload,
        })));
        return notifications_mapper_1.NotificationsMapper.toDomain(updatedEntity);
    }
    async softDelete(id) {
        await this.notificationsRepo.softDelete(id);
    }
};
exports.NotificationsRelationalRepository = NotificationsRelationalRepository;
exports.NotificationsRelationalRepository = NotificationsRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notifications_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationsRelationalRepository);
//# sourceMappingURL=notifications.repository.js.map