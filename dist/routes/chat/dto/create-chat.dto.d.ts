import { User } from 'src/routes/users/domain/user';
import { Chat } from '../domain/chat';
import { GeneralDomainKeysWithId } from 'src/shared/domain/general.domain';
export declare class CreateChatDto implements Omit<Chat, GeneralDomainKeysWithId> {
    title: string;
    members: User[];
}
