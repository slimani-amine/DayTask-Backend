import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { QueryChatDto } from "./dto/query-chat.dto";
import { Chat } from "./domain/chat";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { User } from "../users/domain/user";
import { InfinityPaginationResultType } from "../utils/types/infinity-pagination-result.type";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createDto: CreateChatDto, user: User): Promise<Chat>;
    findAll(query: QueryChatDto, user: User): Promise<InfinityPaginationResultType<Chat>>;
    findOne(id: number, user: User): Promise<import("src/utils/types/nullable.type").NullableType<Chat>>;
    update(id: number, updateTasktDto: UpdateChatDto): Promise<Chat | null>;
    remove(id: number): Promise<{
        status: "success";
        message?: string | undefined;
    }>;
}
