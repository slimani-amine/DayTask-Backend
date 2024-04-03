import { Message } from '../../domain/message';
import { FilterMessageDto, SortMessageDto } from '../../dto/query-message.dto';
import { GeneralRepositoryType } from 'src/shared/repositories/general.repository.type';
export declare abstract class MessageRepository extends GeneralRepositoryType<Message, FilterMessageDto, SortMessageDto, Message['id']> {
}
