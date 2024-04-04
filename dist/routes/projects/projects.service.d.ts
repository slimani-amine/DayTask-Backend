import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectRepository } from "./infastructure/persistence/projects.repository";
import { Project } from "./domain/project";
import { FilterProjectDto, SortProjectDto } from "./dto/query-project.dto";
import { NullableType } from "../../utils/types/nullable.type";
import { IPaginationOptions } from "../../utils/types/pagination-options";
import { UsersService } from "../users/users.service";
export declare class ProjectsService {
    private readonly usersService;
    private readonly projectRepository;
    constructor(usersService: UsersService, projectRepository: ProjectRepository);
    vlaidateMembers(members: {
        id: number;
    }[]): Promise<void>;
    create(createProject: CreateProjectDto): Promise<Project>;
    findAll({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterProjectDto | null;
        sortOptions?: SortProjectDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Project[]>;
    findOne(id: number): Promise<NullableType<Project>>;
    update(id: number, updateProject: UpdateProjectDto): Promise<Project | null>;
    remove(id: number): Promise<void>;
}
