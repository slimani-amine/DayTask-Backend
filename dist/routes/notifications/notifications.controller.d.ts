import { User } from '../users/domain/user';
import { NotificationService } from './notifications.service';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import { QueryNotificationsDto } from './dto/query-notifications.dto';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { Notification } from './domain/notifications';
import { NotificationsSocketGateway } from './socket/notifications-socket.gateway';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
export declare class NotificationController {
    private readonly notificationService;
    private readonly notifSocket;
    constructor(notificationService: NotificationService, notifSocket: NotificationsSocketGateway);
    create(createDto: CreateNotificationsDto, user: User): Promise<Notification>;
    findAll(query: QueryNotificationsDto, user: User): Promise<InfinityPaginationResultType<Notification>>;
    update(id: number, updateTasktDto: UpdateNotificationsDto): Promise<Notification | null>;
    remove(id: number): Promise<{
        status: "success";
        message?: string | undefined;
    }>;
}
