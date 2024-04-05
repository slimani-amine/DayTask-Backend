import { UserMapper } from "src/users/infrastructure/persistence/relational/mappers/user.mapper";
import { TaskEntity } from "../entities/task.entity";
import { Task } from "src/tasks/domain/task";
import { ProjectEntity } from "src/projects/infastructure/persistence/relational/entities/project.entity";
import { Project } from "src/projects/domain/project";

export class TaskMapper {
  static toDomain(raw: TaskEntity): Task {
    const task = new Task();
    const members = raw.members?.map(UserMapper.toDomain);
    const project = new Project();
    if (raw.project?.id) {
      project.id = raw.project.id;
    }
    delete raw.__entity;
    Object.assign(task, raw);
    task.members = members;
    task.project = project;
    return task;
  }

  static toPersistence(entity: Task): TaskEntity {
    const taskEntity = new TaskEntity();
    const members = entity?.members.map(UserMapper.toPersistence);
    const project = new ProjectEntity();
    if (entity.project?.id) {
      project.id = entity.project.id;
    }
    Object.assign(taskEntity, entity);
    taskEntity.project = project;
    taskEntity.members = members;
    return taskEntity;
  }
}
