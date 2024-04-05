import { ProjectsService } from "src/projects/projects.service";
import { User } from "src/users/domain/user";
import { UsersService } from "src/users/users.service";
export declare class ValidateData {
    private readonly usersService;
    private readonly projectsService;
    constructor(usersService: UsersService, projectsService: ProjectsService);
    vlaidateMembers(members: User[]): Promise<void>;
    validateProjectId(projectId: number): Promise<void>;
}
