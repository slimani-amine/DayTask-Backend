import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectRepository } from "./infastructure/persistence/projects.repository";
import { Project } from "./domain/project";
import { FilterProjectDto, SortProjectDto } from "./dto/query-project.dto";
import { NullableType } from "../utils/types/nullable.type";
import { IPaginationOptions } from "../utils/types/pagination-options";
import { User } from "../users/domain/user";
import { UsersService } from "../users/users.service";
@Injectable()
export class ProjectsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectRepository: ProjectRepository
  ) {}

  async vlaidateMembers(members: { id: number }[]) {
    const userIds = members.map((e) => e.id);
    if (new Set(userIds).size !== userIds.length) {
      throw new BadRequestException("Members must be unique");
    }
    const usersPromises = members.map((e) =>
      this.usersService.findOne({
        id: e.id,
      })
    );
    const users = await Promise.all(usersPromises);
    if (users.includes(null)) {
      throw new BadRequestException(
        `User with id ${members[users.indexOf(null)].id} not found`
      );
    }
  }

  async create(createProject: CreateProjectDto): Promise<Project> {
    await this.vlaidateMembers(createProject.members);
    try {
      const created = await this.projectRepository.create(createProject);
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
    filterOptions?: FilterProjectDto | null;
    sortOptions?: SortProjectDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Project[]> {
    return this.projectRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(id: number): Promise<NullableType<Project>> {
    const item = await this.projectRepository.findOne({ id: id });
    return item;
  }

  async update(
    id: number,
    updateProject: UpdateProjectDto
  ): Promise<Project | null> {
    if (updateProject.members) {
      await this.vlaidateMembers(updateProject.members);
    }
    try {
      const updated = await this.projectRepository.update(id, updateProject);
      return updated;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: "Project doesnt exist",
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  async remove(id: number) {
    await this.projectRepository.softDelete(id);
  }
}
