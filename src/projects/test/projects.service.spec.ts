import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { ProjectsService } from "../projects.service";
import { ProjectRepository } from "../infastructure/persistence/projects.repository";
import { UsersService } from "src/users/users.service";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../domain/project";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { FilterProjectDto, SortProjectDto } from "../dto/query-project.dto";
import { IPaginationOptions } from "src/utils/types/pagination-options";

describe("ProjectsService", () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: ProjectRepository,
          useValue: {
            create: jest.fn(),
            findManyWithPagination: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a project", async () => {
      const createProjectDto: CreateProjectDto = {
        title: "Test Project",
        description: "Test Description",
        members: [{ id: 1 }, { id: 2 }],
        due_date: new Date(),
      };
      const createdProject: Project = {
        id: 1,
        ...createProjectDto,
      } as any;

      jest.spyOn(service, "vlaidateMembers").mockResolvedValueOnce(undefined);
      jest
        .spyOn(service["projectRepository"], "create")
        .mockResolvedValueOnce(createdProject);

      const result = await service.create(createProjectDto);
      expect(result).toEqual(createdProject);
    });

    it("should throw a BadRequestException if validation fails", async () => {
      const createProjectDto: CreateProjectDto = {
        title: "Test Project",
        description: "Test Description",
        members: [{ id: "invalid" }],
        due_date: new Date(),
      };

      jest
        .spyOn(service, "vlaidateMembers")
        .mockRejectedValueOnce(new BadRequestException("Validation failed"));

      await expect(service.create(createProjectDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe("findAll", () => {
    it("should return an array of projects", async () => {
      const filterOptions: FilterProjectDto = {};
      const sortOptions: SortProjectDto[] = [];
      const paginationOptions: IPaginationOptions = {} as any;
      const projects: Project[] = [{ id: 1 }, { id: 2 }] as any;

      jest
        .spyOn(service["projectRepository"], "findManyWithPagination")
        .mockResolvedValueOnce(projects);

      const result = await service.findAll({
        filterOptions,
        sortOptions,
        paginationOptions,
      });
      expect(result).toEqual(projects);
    });
  });

  describe("findOne", () => {
    it("should return a project by ID", async () => {
      const projectId = 1;
      const project: Project = { id: projectId, title: "Test Project" } as any;
      jest
        .spyOn(service["projectRepository"], "findOne")
        .mockResolvedValueOnce(project);

      const result = await service.findOne(projectId);
      expect(result).toEqual(project);
    });
  });

  describe("update", () => {
    it("should update a project", async () => {
      const projectId = 1;
      const updateProjectDto: UpdateProjectDto = {
        title: "Updated Project Title",
      };
      const updatedProject: Project = {
        id: projectId,
        ...updateProjectDto,
      } as any;

      jest.spyOn(service, "vlaidateMembers").mockResolvedValueOnce(undefined);
      jest
        .spyOn(service["projectRepository"], "update")
        .mockResolvedValueOnce(updatedProject);

      const result = await service.update(projectId, updateProjectDto);
      expect(result).toEqual(updatedProject);
    });

    it("should throw a HttpException if project does not exist", async () => {
      const projectId = 999;
      const updateProjectDto: UpdateProjectDto = {
        title: "Updated Project Title",
      };

      jest.spyOn(service, "vlaidateMembers").mockResolvedValueOnce(undefined);
      jest
        .spyOn(service["projectRepository"], "update")
        .mockRejectedValueOnce(new Error("Project not found"));

      await expect(service.update(projectId, updateProjectDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe("remove", () => {
    it("should remove a project", async () => {
      const projectId = 1;

      jest
        .spyOn(service["projectRepository"], "softDelete")
        .mockResolvedValueOnce(undefined);

      await service.remove(projectId);
      expect(service["projectRepository"].softDelete).toHaveBeenCalledWith(
        projectId
      );
    });
  });
});
