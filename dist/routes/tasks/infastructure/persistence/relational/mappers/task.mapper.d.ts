import { TaskEntity } from '../entities/task.entity';
import { Task } from 'src/routes/tasks/domain/task';
export declare class TaskMapper {
    static toDomain(raw: TaskEntity): Task;
    static toPersistence(entity: Task): TaskEntity;
}
