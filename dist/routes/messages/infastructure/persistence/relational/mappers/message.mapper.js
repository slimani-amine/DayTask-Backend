"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMapper = void 0;
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
const message_entity_1 = require("../entities/message.entity");
const message_1 = require("../../../../domain/message");
const chat_mapper_1 = require("../../../../../chat/infastructure/persistence/relational/mappers/chat.mapper");
class MessageMapper {
    static toDomain(raw) {
        const msg = new message_1.Message();
        delete raw.__entity;
        Object.assign(msg, raw);
        if (raw.sender) {
            msg.sender = user_mapper_1.UserMapper.toDomain(raw.sender);
        }
        if (raw.chat) {
            msg.chat = chat_mapper_1.ChatMapper.toDomain(raw.chat);
        }
        return msg;
    }
    static toPersistence(entity) {
        const msgEntity = new message_entity_1.MessageEntity();
        Object.assign(msgEntity, entity);
        if (entity.sender) {
            msgEntity.sender = user_mapper_1.UserMapper.toPersistence(entity.sender);
        }
        if (entity.chat) {
            msgEntity.chat = chat_mapper_1.ChatMapper.toPersistence(entity.chat);
        }
        return msgEntity;
    }
}
exports.MessageMapper = MessageMapper;
//# sourceMappingURL=message.mapper.js.map