import { User } from "../users/domain/user";
import { NotificationsRepository } from "./infastructure/persistence/notifications.repository";
import { CreateNotificationsDto } from "./dto/create-notifications.dto";
import { UsersService } from "../users/users.service";
import { UpdateNotificationsDto } from "./dto/update-notifications.dto";
import { FilterNotificationsDto, SortNotificationsDto } from "./dto/query-notifications.dto";
import { Notification } from "./domain/notifications";
import { IPaginationOptions } from "../utils/types/pagination-options";
export declare class NotificationService {
    private readonly notificationRepo;
    private readonly userService;
    constructor(notificationRepo: NotificationsRepository, userService: UsersService);
    create(createPayload: CreateNotificationsDto, user_id: User["id"]): Promise<Notification>;
    findAll({ filterOptions, sortOptions, paginationOptions, userId, }: {
        filterOptions?: FilterNotificationsDto | null;
        sortOptions?: SortNotificationsDto[] | null;
        paginationOptions: IPaginationOptions;
        userId: User["id"];
    }): Promise<Notification[]>;
    update(id: number, updatePayload: UpdateNotificationsDto): Promise<Notification | null>;
    remove(id: number): Promise<void>;
}
