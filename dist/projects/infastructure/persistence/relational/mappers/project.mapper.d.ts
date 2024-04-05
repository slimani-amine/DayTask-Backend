import { Project } from "src/projects/domain/project";
import { ProjectEntity } from "../entities/project.entity";
export declare class ProjectMapper {
    static toDomain(raw: ProjectEntity): Project;
    static toPersistence(entity: Project): ProjectEntity;
}
