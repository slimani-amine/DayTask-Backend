import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { TaskEntity } from '../entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';
import { Task } from 'src/routes/tasks/domain/task';
import { TaskRepository } from '../../tasks.repository';
import {
  FilterTaskDto,
  SortTaskDto,
} from 'src/routes/tasks/dto/query-task.dto';

@Injectable()
export class TaskRelationalRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(data: Task): Promise<Task> {
    const persistenceModel = TaskMapper.toPersistence(data);
    const newEntity = await this.tasksRepository.save(
      this.tasksRepository.create(persistenceModel),
    );
    return TaskMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterTaskDto | null;
    sortOptions?: SortTaskDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Task[]> {
    const entities = await this.tasksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: filterOptions ?? {},
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((user) => TaskMapper.toDomain(user));
  }

  async findOne(fields: EntityCondition<Task>): Promise<NullableType<Task>> {
    const entity = await this.tasksRepository.findOne({
      where: fields as FindOptionsWhere<TaskEntity>,
    });

    return entity ? TaskMapper.toDomain(entity) : null;
  }

  async update(id: Task['id'], payload: Partial<Task>): Promise<Task> {
    const entity = await this.tasksRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new BadRequestException('Task not found');
    }

    const updatedEntity = await this.tasksRepository.save(
      this.tasksRepository.create(
        TaskMapper.toPersistence({
          ...TaskMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TaskMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Task['id']): Promise<void> {
    await this.tasksRepository.softDelete(id);
  }
}
