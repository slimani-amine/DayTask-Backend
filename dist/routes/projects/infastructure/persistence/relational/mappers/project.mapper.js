"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMapper = void 0;
const project_1 = require("../../../../domain/project");
const project_entity_1 = require("../entities/project.entity");
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
class ProjectMapper {
    static toDomain(raw) {
        const project = new project_1.Project();
        const members = raw.members.map(user_mapper_1.UserMapper.toDomain);
        delete raw.__entity;
        Object.assign(project, raw);
        project.members = members;
        return project;
    }
    static toPersistence(entity) {
        const projectEntity = new project_entity_1.ProjectEntity();
        const members = entity.members.map(user_mapper_1.UserMapper.toPersistence);
        Object.assign(projectEntity, entity);
        projectEntity.members = members;
        return projectEntity;
    }
}
exports.ProjectMapper = ProjectMapper;
//# sourceMappingURL=project.mapper.js.map