import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { FindOptionsWhere } from 'typeorm';
import { Chat } from '../domain/chat';
import { ChatEntity } from '../infastructure/persistence/relational/entities/chat.entity';
export type FilterChatDto = FindOptionsWhere<ChatEntity>;
export declare class SortChatDto extends SortDto<Chat> {
}
export declare class QueryChatDto extends QueryDto<Chat, FilterChatDto> {
}
