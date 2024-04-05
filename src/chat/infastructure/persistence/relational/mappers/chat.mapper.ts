import { UserMapper } from "src/users/infrastructure/persistence/relational/mappers/user.mapper";
import { ChatEntity } from "../entities/chat.entity";
import { Chat } from "src/chat/domain/chat";

export class ChatMapper {
  static toDomain(raw: ChatEntity): Chat {
    const chat = new Chat();
    const members = raw?.members?.map(UserMapper.toDomain);
    delete raw.__entity;
    Object.assign(chat, raw);
    chat.members = members;
    return chat;
  }

  static toPersistence(entity: Chat): ChatEntity {
    const chatEntity = new ChatEntity();
    const members = entity?.members?.map(UserMapper.toPersistence);

    Object.assign(chatEntity, entity);
    chatEntity.members = members;
    return chatEntity;
  }
}
