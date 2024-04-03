import { ProjectEntity } from 'src/routes/projects/infastructure/persistence/relational/entities/project.entity';
import { User } from 'src/routes/users/domain/user';
import { Task } from '../domain/task';
import { GeneralDomainKeysWithId } from 'src/shared/domain/general.domain';
import { Project } from '../../projects/domain/project';
export declare class CreateTaskDto implements Omit<Task, GeneralDomainKeysWithId> {
    title: string;
    description: string | null;
    projectId: ProjectEntity['id'];
    project: Project;
    due_date: Date | null;
    members: User[];
    completed: boolean;
    completedAt: Date | null;
    startedAt: Date | null;
}
