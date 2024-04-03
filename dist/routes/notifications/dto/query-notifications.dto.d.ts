import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { FindOptionsWhere } from 'typeorm';
import { Notification } from '../domain/notifications';
import { NotificationEntity } from '../infastructure/persistence/relational/entities/notifications.entity';
export type FilterNotificationsDto = FindOptionsWhere<NotificationEntity>;
export declare class SortNotificationsDto extends SortDto<Notification> {
}
export declare class QueryNotificationsDto extends QueryDto<Notification, FilterNotificationsDto> {
}
