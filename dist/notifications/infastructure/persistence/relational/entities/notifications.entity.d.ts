import { GeneralEntity } from "src/shared/entities/general.entity";
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";
import { Notification } from "src/notifications/domain/notifications";
export declare class NotificationEntity extends GeneralEntity implements Notification {
    id: number;
    content: string;
    receivers: UserEntity[];
    sender: UserEntity;
    seen: boolean;
}
