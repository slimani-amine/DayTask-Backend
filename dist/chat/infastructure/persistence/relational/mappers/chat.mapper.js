"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMapper = void 0;
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
const chat_entity_1 = require("../entities/chat.entity");
const chat_1 = require("../../../../domain/chat");
class ChatMapper {
    static toDomain(raw) {
        const chat = new chat_1.Chat();
        const members = raw?.members?.map(user_mapper_1.UserMapper.toDomain);
        delete raw.__entity;
        Object.assign(chat, raw);
        chat.members = members;
        return chat;
    }
    static toPersistence(entity) {
        const chatEntity = new chat_entity_1.ChatEntity();
        const members = entity?.members?.map(user_mapper_1.UserMapper.toPersistence);
        Object.assign(chatEntity, entity);
        chatEntity.members = members;
        return chatEntity;
    }
}
exports.ChatMapper = ChatMapper;
//# sourceMappingURL=chat.mapper.js.map