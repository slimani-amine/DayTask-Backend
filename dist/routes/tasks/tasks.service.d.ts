import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './infastructure/persistence/tasks.repository';
import { Task } from './domain/task';
import { FilterTaskDto, SortTaskDto } from './dto/query-task.dto';
import { ProjectsService } from 'src/routes/projects/projects.service';
import { ValidateData } from '../../utils/validation/vlalidate-data';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../users/domain/user';
export declare class TasksService {
    private readonly validateData;
    private readonly taskRepository;
    private readonly projectService;
    constructor(validateData: ValidateData, taskRepository: TaskRepository, projectService: ProjectsService);
    create(createPayload: CreateTaskDto): Promise<Task>;
    findAll({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterTaskDto | null;
        sortOptions?: SortTaskDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Task[]>;
    findOne(id: number): Promise<NullableType<Task>>;
    update(id: number, updatePayload: UpdateTaskDto): Promise<Task | null>;
    remove(id: number): Promise<void>;
    validteMembersInProject({ members, projectId, taskId, }: {
        members: User[];
        projectId: number | undefined;
        taskId: number;
    }): Promise<void>;
}
