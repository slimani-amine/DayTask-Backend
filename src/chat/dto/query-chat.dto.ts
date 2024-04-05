import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { FindOptionsWhere } from 'typeorm';
import { Chat } from '../domain/chat';
import { ChatEntity } from '../infastructure/persistence/relational/entities/chat.entity';

export type FilterChatDto = FindOptionsWhere<ChatEntity>;

export class SortChatDto extends SortDto<Chat> {}

export class QueryChatDto extends QueryDto<Chat, FilterChatDto> {}
