import { UserMapper } from "src/users/infrastructure/persistence/relational/mappers/user.mapper";
import { MessageEntity } from "../entities/message.entity";
import { Message } from "src/messages/domain/message";
import { ChatMapper } from "src/chat/infastructure/persistence/relational/mappers/chat.mapper";

export class MessageMapper {
  static toDomain(raw: MessageEntity): Message {
    const msg = new Message();
    delete raw.__entity;
    Object.assign(msg, raw);
    if (raw.sender) {
      msg.sender = UserMapper.toDomain(raw.sender);
    }
    if (raw.chat) {
      msg.chat = ChatMapper.toDomain(raw.chat);
    }
    return msg;
  }

  static toPersistence(entity: Message): MessageEntity {
    const msgEntity = new MessageEntity();
    Object.assign(msgEntity, entity);
    if (entity.sender) {
      msgEntity.sender = UserMapper.toPersistence(entity.sender);
    }
    if (entity.chat) {
      msgEntity.chat = ChatMapper.toPersistence(entity.chat);
    }
    return msgEntity;
  }
}
