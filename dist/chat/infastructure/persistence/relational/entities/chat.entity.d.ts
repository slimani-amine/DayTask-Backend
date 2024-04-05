import { GeneralEntity } from "src/shared/entities/general.entity";
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";
import { Chat } from "src/chat/domain/chat";
export declare class ChatEntity extends GeneralEntity implements Chat {
    id: number;
    title: string;
    members: UserEntity[];
}
