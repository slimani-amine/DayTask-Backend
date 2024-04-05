import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { Repository } from "typeorm";
import { NullableType } from "../../../../../utils/types/nullable.type";
import { MessageRepository } from "../../Message.repository";
import { MessageEntity } from "../entities/message.entity";
import { FilterMessageDto, SortMessageDto } from "src/messages/dto/query-message.dto";
import { Message } from "src/messages/domain/message";
export declare class MessageRelationalRepository implements MessageRepository {
    private readonly msgRepository;
    constructor(msgRepository: Repository<MessageEntity>);
    create(data: Message): Promise<Message>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterMessageDto | null;
        sortOptions?: SortMessageDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Message[]>;
    findOne(fields: EntityCondition<Message>): Promise<NullableType<Message>>;
    update(id: Message["id"], payload: Partial<Message>): Promise<Message>;
    softDelete(id: Message["id"]): Promise<void>;
}
