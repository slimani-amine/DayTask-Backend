import { GeneralEntity } from 'src/shared/entities/general.entity';
import { UserEntity } from 'src/routes/users/infrastructure/persistence/relational/entities/user.entity';
import { Message, MessageTypes } from 'src/routes/messages/domain/message';
import { ChatEntity } from 'src/routes/chat/infastructure/persistence/relational/entities/chat.entity';
export declare class MessageEntity extends GeneralEntity implements Message {
    id: number;
    content: string;
    sender: UserEntity;
    type: MessageTypes;
    seen: boolean;
    chat: ChatEntity;
}
