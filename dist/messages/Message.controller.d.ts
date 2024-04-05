import { MessageService } from "./Message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { QueryMessageDto } from "./dto/query-message.dto";
import { Message } from "./domain/message";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { ChatService } from "../chat/chat.service";
import { User } from "../users/domain/user";
import { MessagesSocketGateway } from "./socket/messages-socket.gateway";
import { InfinityPaginationResultType } from "../utils/types/infinity-pagination-result.type";
export declare class MessageController {
    private readonly msgService;
    private readonly chatService;
    private readonly msgSocket;
    constructor(msgService: MessageService, chatService: ChatService, msgSocket: MessagesSocketGateway);
    create(createDto: CreateMessageDto, user: User): Promise<Message>;
    findAll(chatId: number, query: QueryMessageDto, user: User): Promise<InfinityPaginationResultType<Message>>;
    update(id: number, updateTasktDto: UpdateMessageDto): Promise<Message | null>;
    remove(id: number): Promise<{
        status: "success";
        message?: string | undefined;
    }>;
}
