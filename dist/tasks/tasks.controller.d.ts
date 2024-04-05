import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { QueryTaskDto } from "./dto/query-task.dto";
import { Task } from "./domain/task";
import { TasksService } from "./tasks.service";
import { InfinityPaginationResultType } from "../utils/types/infinity-pagination-result.type";
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(query: QueryTaskDto): Promise<InfinityPaginationResultType<Task>>;
    findOne(id: number): Promise<import("src/utils/types/nullable.type").NullableType<Task>>;
    update(id: number, updateTasktDto: UpdateTaskDto): Promise<Task | null>;
    remove(id: number): Promise<{
        status: "success";
        message?: string | undefined;
    }>;
}
