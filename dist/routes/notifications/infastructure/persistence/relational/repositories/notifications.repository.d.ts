import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { NotificationEntity } from '../entities/notifications.entity';
import { NotificationsRepository } from '../../notifications.repository';
import { Notification } from 'src/routes/notifications/domain/notifications';
import { FilterNotificationsDto, SortNotificationsDto } from 'src/routes/notifications/dto/query-notifications.dto';
import { User } from 'src/routes/users/domain/user';
export declare class NotificationsRelationalRepository implements NotificationsRepository {
    private readonly notificationsRepo;
    constructor(notificationsRepo: Repository<NotificationEntity>);
    create(data: Notification): Promise<Notification>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, userId, }: {
        filterOptions?: FilterNotificationsDto | null;
        sortOptions?: SortNotificationsDto[] | null;
        paginationOptions: IPaginationOptions;
        userId: User['id'];
    }): Promise<Notification[]>;
    findOne(fields: EntityCondition<Notification>): Promise<NullableType<Notification>>;
    update(id: Notification['id'], payload: Partial<Notification>): Promise<Notification>;
    softDelete(id: Notification['id']): Promise<void>;
}
