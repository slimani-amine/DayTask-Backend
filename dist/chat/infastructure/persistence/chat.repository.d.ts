import { Chat } from '../../domain/chat';
import { FilterChatDto, SortChatDto } from '../../dto/query-chat.dto';
import { GeneralRepositoryType } from 'src/shared/repositories/general.repository.type';
export declare abstract class ChatRepository extends GeneralRepositoryType<Chat, FilterChatDto, SortChatDto, Chat['id']> {
}
