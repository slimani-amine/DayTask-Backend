import { ChatEntity } from "../entities/chat.entity";
import { Chat } from "src/chat/domain/chat";
export declare class ChatMapper {
    static toDomain(raw: ChatEntity): Chat;
    static toPersistence(entity: Chat): ChatEntity;
}
