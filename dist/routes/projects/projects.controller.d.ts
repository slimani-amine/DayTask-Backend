import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './domain/project';
import { QueryProjectDto } from './dto/query-project.dto';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(query: QueryProjectDto): Promise<InfinityPaginationResultType<Project>>;
    findOne(id: number): Promise<import("src/utils/types/nullable.type").NullableType<Project>>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project | null>;
    remove(id: number): Promise<{
        status: "success";
        message?: string | undefined;
    }>;
}
