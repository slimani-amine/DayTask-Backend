import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { Repository } from "typeorm";
import { NullableType } from "../../../../../utils/types/nullable.type";
import { TaskEntity } from "../entities/task.entity";
import { Task } from "src/tasks/domain/task";
import { TaskRepository } from "../../tasks.repository";
import { FilterTaskDto, SortTaskDto } from "src/tasks/dto/query-task.dto";
export declare class TaskRelationalRepository implements TaskRepository {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<TaskEntity>);
    create(data: Task): Promise<Task>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterTaskDto | null;
        sortOptions?: SortTaskDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Task[]>;
    findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>>;
    update(id: Task["id"], payload: Partial<Task>): Promise<Task>;
    softDelete(id: Task["id"]): Promise<void>;
}
