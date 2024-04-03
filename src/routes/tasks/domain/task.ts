import { Project } from 'src/routes/projects/domain/project';
import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';

export class Task extends GeneralDomain {
  id: number;
  title: string;
  description: string | null;
  project: Project;
  projectId?: number;
  members: User[];
  completed: boolean;
  completedAt: Date | null;
  due_date: Date | null;
  startedAt: Date | null;
}
