"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskMapper = void 0;
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
const task_entity_1 = require("../entities/task.entity");
const task_1 = require("../../../../domain/task");
const project_entity_1 = require("../../../../../projects/infastructure/persistence/relational/entities/project.entity");
const project_1 = require("../../../../../projects/domain/project");
class TaskMapper {
    static toDomain(raw) {
        const task = new task_1.Task();
        const members = raw.members?.map(user_mapper_1.UserMapper.toDomain);
        const project = new project_1.Project();
        if (raw.project?.id) {
            project.id = raw.project.id;
        }
        delete raw.__entity;
        Object.assign(task, raw);
        task.members = members;
        task.project = project;
        return task;
    }
    static toPersistence(entity) {
        const taskEntity = new task_entity_1.TaskEntity();
        const members = entity?.members.map(user_mapper_1.UserMapper.toPersistence);
        const project = new project_entity_1.ProjectEntity();
        if (entity.project?.id) {
            project.id = entity.project.id;
        }
        Object.assign(taskEntity, entity);
        taskEntity.project = project;
        taskEntity.members = members;
        return taskEntity;
    }
}
exports.TaskMapper = TaskMapper;
//# sourceMappingURL=task.mapper.js.map