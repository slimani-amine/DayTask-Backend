"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const role_entity_1 = require("../../../../../roles/infrastructure/persistence/relational/entities/role.entity");
const user_1 = require("../../../../domain/user");
const user_entity_1 = require("../entities/user.entity");
const file_entity_1 = require("../../../../../files/infrastructure/persistence/relational/entities/file.entity");
const status_entity_1 = require("../../../../../shared/statuses/infrastructure/persistence/relational/entities/status.entity");
const file_mapper_1 = require("../../../../../files/infrastructure/persistence/relational/mappers/file.mapper");
class UserMapper {
    static toDomain(raw) {
        const user = new user_1.User();
        delete raw.__entity;
        Object.assign(user, raw);
        if (raw.photo) {
            user.photo = file_mapper_1.FileMapper.toDomain(raw.photo);
        }
        return user;
    }
    static toPersistence(user) {
        let role = undefined;
        if (user.role) {
            role = new role_entity_1.RoleEntity();
            role.id = user.role.id;
        }
        let photo = undefined;
        if (user.photo) {
            photo = new file_entity_1.FileEntity();
            photo.id = user.photo.id;
            photo.path = user.photo.path;
        }
        else if (user.photo === null) {
            photo = null;
        }
        let status = undefined;
        if (user.status) {
            status = new status_entity_1.StatusEntity();
            status.id = user.status.id;
        }
        const userEntity = new user_entity_1.UserEntity();
        Object.assign(userEntity, user);
        if (user.id && typeof user.id === "number") {
            userEntity.id = user.id;
        }
        userEntity.photo = photo;
        userEntity.role = role;
        userEntity.status = status;
        return userEntity;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map