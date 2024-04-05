"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMapper = void 0;
const user_entity_1 = require("../../../../../users/infrastructure/persistence/relational/entities/user.entity");
const session_1 = require("../../../../domain/session");
const session_entity_1 = require("../entities/session.entity");
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
class SessionMapper {
    static toDomain(raw) {
        const session = new session_1.Session();
        session.id = raw.id;
        if (raw.user) {
            session.user = user_mapper_1.UserMapper.toDomain(raw.user);
        }
        session.hash = raw.hash;
        session.createdAt = raw.createdAt;
        session.updatedAt = raw.updatedAt;
        session.deletedAt = raw.deletedAt;
        return session;
    }
    static toPersistence(session) {
        const user = new user_entity_1.UserEntity();
        user.id = Number(session.user.id);
        const sessionEntity = new session_entity_1.SessionEntity();
        if (session.id && typeof session.id === "number") {
            sessionEntity.id = session.id;
        }
        sessionEntity.hash = session.hash;
        sessionEntity.user = user;
        sessionEntity.createdAt = session.createdAt;
        sessionEntity.updatedAt = session.updatedAt;
        sessionEntity.deletedAt = session.deletedAt;
        return sessionEntity;
    }
}
exports.SessionMapper = SessionMapper;
//# sourceMappingURL=session.mapper.js.map