import { MessageEntity } from "../entities/message.entity";
import { Message } from "src/messages/domain/message";
export declare class MessageMapper {
    static toDomain(raw: MessageEntity): Message;
    static toPersistence(entity: Message): MessageEntity;
}
