import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { ProjectRepository } from '../../projects.repository';
import { ProjectEntity } from '../entities/project.entity';
import { Project } from 'src/routes/projects/domain/project';
import { FilterProjectDto, SortProjectDto } from 'src/routes/projects/dto/query-project.dto';
export declare class ProjectRelationalRepository implements ProjectRepository {
    private readonly projectsRepository;
    constructor(projectsRepository: Repository<ProjectEntity>);
    create(data: Project): Promise<Project>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterProjectDto | null;
        sortOptions?: SortProjectDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Project[]>;
    findOne(fields: EntityCondition<Project>): Promise<NullableType<Project>>;
    update(id: Project['id'], payload: Partial<Project>): Promise<Project>;
    softDelete(id: Project['id']): Promise<void>;
}
