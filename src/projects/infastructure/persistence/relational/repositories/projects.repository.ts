import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { FindOptionsWhere, Repository } from "typeorm";
import { NullableType } from "../../../../../utils/types/nullable.type";
import { ProjectRepository } from "../../projects.repository";
import { ProjectEntity } from "../entities/project.entity";
import { Project } from "src/projects/domain/project";
import { ProjectMapper } from "../mappers/project.mapper";
import {
  FilterProjectDto,
  SortProjectDto,
} from "src/projects/dto/query-project.dto";

@Injectable()
export class ProjectRelationalRepository implements ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>
  ) {}

  async create(data: Project): Promise<Project> {
    const persistenceModel = ProjectMapper.toPersistence(data);
    const newEntity = await this.projectsRepository.save(
      this.projectsRepository.create(persistenceModel)
    );
    return ProjectMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProjectDto | null;
    sortOptions?: SortProjectDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Project[]> {
    const entities = await this.projectsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: filterOptions ?? {},
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {}
      ),
    });

    return entities.map((user) => ProjectMapper.toDomain(user));
  }

  async findOne(
    fields: EntityCondition<Project>
  ): Promise<NullableType<Project>> {
    const entity = await this.projectsRepository.findOne({
      where: fields as FindOptionsWhere<ProjectEntity>,
    });

    return entity ? ProjectMapper.toDomain(entity) : null;
  }

  async update(id: Project["id"], payload: Partial<Project>): Promise<Project> {
    const entity = await this.projectsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error("Project not found");
    }

    const updatedEntity = await this.projectsRepository.save(
      this.projectsRepository.create(
        ProjectMapper.toPersistence({
          ...ProjectMapper.toDomain(entity),
          ...payload,
        })
      )
    );

    return ProjectMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Project["id"]): Promise<void> {
    await this.projectsRepository.softDelete(id);
  }
}
