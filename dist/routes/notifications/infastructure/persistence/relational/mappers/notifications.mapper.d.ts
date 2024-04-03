import { NotificationEntity } from '../entities/notifications.entity';
import { Notification } from 'src/routes/notifications/domain/notifications';
export declare class NotificationsMapper {
    static toDomain(raw: NotificationEntity): Notification;
    static toPersistence(entity: Notification): NotificationEntity;
}
