import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { Repository } from "typeorm";
import { NullableType } from "../../../../../utils/types/nullable.type";
import { ChatRepository } from "../../chat.repository";
import { ChatEntity } from "../entities/chat.entity";
import { Chat } from "src/chat/domain/chat";
import { FilterChatDto, SortChatDto } from "src/chat/dto/query-chat.dto";
export declare class ChatRelationalRepository implements ChatRepository {
    private readonly chatRepository;
    constructor(chatRepository: Repository<ChatEntity>);
    create(data: Chat): Promise<Chat>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterChatDto | null;
        sortOptions?: SortChatDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Chat[]>;
    findOne(fields: EntityCondition<Chat>): Promise<NullableType<Chat>>;
    update(id: Chat["id"], payload: Partial<Chat>): Promise<Chat>;
    softDelete(id: Chat["id"]): Promise<void>;
}
