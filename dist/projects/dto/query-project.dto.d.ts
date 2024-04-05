import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { Project } from '../domain/project';
import { FindOptionsWhere } from 'typeorm';
import { ProjectEntity } from '../infastructure/persistence/relational/entities/project.entity';
export type FilterProjectDto = FindOptionsWhere<ProjectEntity>;
export declare class SortProjectDto extends SortDto<Project> {
}
export declare class QueryProjectDto extends QueryDto<Project, FilterProjectDto> {
}
