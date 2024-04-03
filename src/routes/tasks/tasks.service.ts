import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './infastructure/persistence/tasks.repository';
import { Task } from './domain/task';
import { FilterTaskDto, SortTaskDto } from './dto/query-task.dto';
import { ProjectsService } from 'src/routes/projects/projects.service';
import { ProjectEntity } from 'src/routes/projects/infastructure/persistence/relational/entities/project.entity';
import { ValidateData } from '../../utils/validation/vlalidate-data';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../users/domain/user';

@Injectable()
export class TasksService {
  constructor(
    private readonly validateData: ValidateData,
    private readonly taskRepository: TaskRepository,
    private readonly projectService: ProjectsService,
  ) {}

  async create(createPayload: CreateTaskDto): Promise<Task> {
    const { projectId, ...rest } = createPayload;
    await Promise.all([
      this.validateData.vlaidateMembers(createPayload.members),
      this.validateData.validateProjectId(projectId),
    ]);
    try {
      const created = await this.taskRepository.create({
        ...rest,
        project: { id: projectId } as ProjectEntity,
      });
      return created;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskDto | null;
    sortOptions?: SortTaskDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]> {
    return this.taskRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(id: number): Promise<NullableType<Task>> {
    const item = await this.taskRepository.findOne({ id: id });
    return item;
  }

  async update(id: number, updatePayload: UpdateTaskDto): Promise<Task | null> {
    const validationPromises: Promise<void>[] = [];
    if (updatePayload.projectId) {
      validationPromises.push(
        this.validateData.validateProjectId(updatePayload.projectId),
      );
    }
    if (updatePayload.members) {
      validationPromises.push(
        this.validateData.vlaidateMembers(updatePayload.members),
      );
      validationPromises.push(
        this.validteMembersInProject({
          members: updatePayload.members,
          projectId: updatePayload.projectId,
          taskId: id,
        }),
      );
    }

    await Promise.all(validationPromises);
    try {
      const updated = await this.taskRepository.update(id, updatePayload);
      return updated;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Task doesnt exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(id: number) {
    await this.taskRepository.softDelete(id);
  }

  async validteMembersInProject({
    members,
    projectId,
    taskId,
  }: {
    members: User[];
    projectId: number | undefined;
    taskId: number;
  }) {
    const userIds = members.map((e) => e.id);
    let task: Task | null = null;
    if (!projectId) {
      task = await this.taskRepository.findOne({ id: taskId });
    }
    if (task === null && !projectId) {
      throw new BadRequestException(`Task with id ${taskId} not found`);
    }
    const project = await this.projectService.findOne(
      // @ts-expect-error task.project.id is never null
      projectId ?? task.project.id,
    );
    const projectMembersIds = project?.members.map((e) => e.id);
    userIds?.forEach((e) => {
      if (!projectMembersIds?.includes(e)) {
        throw new BadRequestException(`User with id ${e} not a project member`);
      }
    });
  }
}
