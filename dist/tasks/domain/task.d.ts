import { Project } from "src/projects/domain/project";
import { User } from "src/users/domain/user";
import { GeneralDomain } from "src/shared/domain/general.domain";
export declare class Task extends GeneralDomain {
    id: number;
    title: string;
    description: string | null;
    project?: Project;
    projectId?: number;
    members: User[];
    completed: boolean;
    completedAt: Date | null;
    due_date: Date | string | null;
    startedAt: Date | null;
}
