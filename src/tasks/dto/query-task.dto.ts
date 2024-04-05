import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { Task } from '../domain/task';
import { FindOptionsWhere } from 'typeorm';
import { TaskEntity } from '../infastructure/persistence/relational/entities/task.entity';

export type FilterTaskDto = FindOptionsWhere<TaskEntity>;

export class SortTaskDto extends SortDto<Task> {}

export class QueryTaskDto extends QueryDto<Task, FilterTaskDto> {}
