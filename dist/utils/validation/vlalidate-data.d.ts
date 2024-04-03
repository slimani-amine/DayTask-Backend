import { ProjectsService } from 'src/routes/projects/projects.service';
import { User } from 'src/routes/users/domain/user';
import { UsersService } from 'src/routes/users/users.service';
export declare class ValidateData {
    private readonly usersService;
    private readonly projectsService;
    constructor(usersService: UsersService, projectsService: ProjectsService);
    vlaidateMembers(members: User[]): Promise<void>;
    validateProjectId(projectId: number): Promise<void>;
}
