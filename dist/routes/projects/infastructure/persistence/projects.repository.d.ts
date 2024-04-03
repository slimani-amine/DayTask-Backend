import { Project } from 'src/routes/projects/domain/project';
import { FilterProjectDto, SortProjectDto } from 'src/routes/projects/dto/query-project.dto';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { EntityCondition } from '../../../../utils/types/entity-condition.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
export declare abstract class ProjectRepository {
    abstract create(data: Omit<Project, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>): Promise<Project>;
    abstract findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterProjectDto | null;
        sortOptions?: SortProjectDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Project[]>;
    abstract findOne(fields: EntityCondition<Project>): Promise<NullableType<Project>>;
    abstract update(id: Project['id'], payload: DeepPartial<Project>): Promise<Project | null>;
    abstract softDelete(id: Project['id']): Promise<void>;
}
