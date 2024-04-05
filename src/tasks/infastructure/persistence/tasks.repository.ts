import { FilterTaskDto, SortTaskDto } from "src/tasks/dto/query-task.dto";
import { Task } from "src/tasks/domain/task";
import { IPaginationOptions } from "../../../utils/types/pagination-options";
import { EntityCondition } from "../../../utils/types/entity-condition.type";
import { NullableType } from "../../../utils/types/nullable.type";
import { DeepPartial } from "typeorm";

export abstract class TaskRepository {
  abstract create(
    data: Omit<Task, "id" | "createdAt" | "deletedAt" | "updatedAt">
  ): Promise<Task>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskDto | null;
    sortOptions?: SortTaskDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]>;

  abstract findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>>;

  abstract update(
    id: Task["id"],
    payload: DeepPartial<Task>
  ): Promise<Task | null>;

  abstract softDelete(id: Task["id"]): Promise<void>;
}
