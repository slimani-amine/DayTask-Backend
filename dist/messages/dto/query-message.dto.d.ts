import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { FindOptionsWhere } from 'typeorm';
import { MessageEntity } from '../infastructure/persistence/relational/entities/message.entity';
import { Message } from '../domain/message';
export type FilterMessageDto = FindOptionsWhere<MessageEntity>;
export declare class SortMessageDto extends SortDto<Message> {
}
export declare class QueryMessageDto extends QueryDto<Message, FilterMessageDto> {
}
