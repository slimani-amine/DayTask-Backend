import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { Notification } from "../domain/notifications";
import { User } from "src/routes/users/domain/user";
export declare class CreateNotificationsDto implements Omit<Notification, GeneralDomainKeysWithId | "sender"> {
    content: string;
    seen: boolean;
    receivers: User[];
}
