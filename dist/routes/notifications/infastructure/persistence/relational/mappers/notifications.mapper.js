"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsMapper = void 0;
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
const notifications_entity_1 = require("../entities/notifications.entity");
const notifications_1 = require("../../../../domain/notifications");
class NotificationsMapper {
    static toDomain(raw) {
        const notification = new notifications_1.Notification();
        delete raw.__entity;
        Object.assign(notification, raw);
        if (raw.receivers) {
            notification.receivers = raw.receivers.map(user_mapper_1.UserMapper.toDomain);
        }
        if (raw.sender) {
            notification.sender = user_mapper_1.UserMapper.toDomain(raw.sender);
        }
        return notification;
    }
    static toPersistence(entity) {
        const Entity = new notifications_entity_1.NotificationEntity();
        Object.assign(Entity, entity);
        if (entity.receivers) {
            Entity.receivers = entity.receivers.map(user_mapper_1.UserMapper.toPersistence);
        }
        if (entity.sender) {
            Entity.sender = user_mapper_1.UserMapper.toPersistence(entity.sender);
        }
        return Entity;
    }
}
exports.NotificationsMapper = NotificationsMapper;
//# sourceMappingURL=notifications.mapper.js.map