import { ProjectEntity } from "src/projects/infastructure/persistence/relational/entities/project.entity";
import { GeneralEntity } from "src/shared/entities/general.entity";
import { Task } from "src/tasks/domain/task";
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";
export declare class TaskEntity extends GeneralEntity implements Task {
    id: number;
    title: string;
    description: string;
    project: ProjectEntity;
    due_date: Date;
    members: UserEntity[];
    completed: boolean;
    completedAt: Date;
    startedAt: Date;
}
