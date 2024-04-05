import { Project } from "src/projects/domain/project";
import { ProjectEntity } from "../entities/project.entity";
import { UserMapper } from "src/users/infrastructure/persistence/relational/mappers/user.mapper";

export class ProjectMapper {
  static toDomain(raw: ProjectEntity): Project {
    const project = new Project();
    const members = raw.members.map(UserMapper.toDomain);
    delete raw.__entity;
    Object.assign(project, raw);
    project.members = members;
    return project;
  }

  static toPersistence(entity: Project): ProjectEntity {
    const projectEntity = new ProjectEntity();
    const members = entity.members.map(UserMapper.toPersistence);
    Object.assign(projectEntity, entity);
    projectEntity.members = members;
    return projectEntity;
  }
}
