import { User } from "../users/domain/user";
import { MessageRepository } from "./infastructure/persistence/Message.repository";
import { Message } from "./domain/message";
import { CreateMessageDto } from "./dto/create-message.dto";
import { FilterMessageDto, SortMessageDto } from "./dto/query-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Chat } from "../chat/domain/chat";
import { ChatService } from "../chat/chat.service";
import { IPaginationOptions } from "../utils/types/pagination-options";
export declare class MessageService {
    private readonly msgRepository;
    private readonly chatService;
    constructor(msgRepository: MessageRepository, chatService: ChatService);
    create(createPayload: CreateMessageDto, user_id: User["id"]): Promise<Message>;
    findAll({ filterOptions, sortOptions, paginationOptions, chatId, }: {
        filterOptions?: FilterMessageDto | null;
        sortOptions?: SortMessageDto[] | null;
        paginationOptions: IPaginationOptions;
        chatId: Chat["id"];
    }): Promise<Message[]>;
    update(id: number, updatePayload: UpdateMessageDto): Promise<Message | null>;
    remove(id: number): Promise<void>;
    validateChat(chatId: number, userId: User["id"]): Promise<void>;
}
