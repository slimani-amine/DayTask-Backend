import { UserMapper } from 'src/routes/users/infrastructure/persistence/relational/mappers/user.mapper';
import { NotificationEntity } from '../entities/notifications.entity';
import { Notification } from 'src/routes/notifications/domain/notifications';

export class NotificationsMapper {
  static toDomain(raw: NotificationEntity): Notification {
    const notification = new Notification();
    delete raw.__entity;
    Object.assign(notification, raw);
    if (raw.receivers) {
      notification.receivers = raw.receivers.map(UserMapper.toDomain);
    }
    if (raw.sender) {
      notification.sender = UserMapper.toDomain(raw.sender);
    }
    return notification;
  }

  static toPersistence(entity: Notification): NotificationEntity {
    const Entity = new NotificationEntity();
    Object.assign(Entity, entity);
    if (entity.receivers) {
      Entity.receivers = entity.receivers.map(UserMapper.toPersistence);
    }
    if (entity.sender) {
      Entity.sender = UserMapper.toPersistence(entity.sender);
    }
    return Entity;
  }
}
