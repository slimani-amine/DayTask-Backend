import { ProjectEntity } from "src/projects/infastructure/persistence/relational/entities/project.entity";
import { Task } from "../domain/task";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { Project } from "../../projects/domain/project";
export declare class CreateTaskDto implements Omit<Task, GeneralDomainKeysWithId> {
    title: string;
    description: string | null;
    projectId: ProjectEntity["id"];
    project?: Project;
    due_date: Date | string | null;
    members: any;
    completed: boolean;
    completedAt: Date | null;
    startedAt: Date | null;
}
