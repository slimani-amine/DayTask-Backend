import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsController } from "../projects.controller";
import { ProjectsService } from "../projects.service";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../domain/project";
import { UpdateProjectDto } from "../dto/update-project.dto";

describe("ProjectsController", () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new project", async () => {
      const mockCreateProjectDto: CreateProjectDto = {
        title: "New Project",
        description: "Project description",
        members: [],
        due_date: new Date(),
      };
      const mockCreatedProject: Project = {
        id: 1,
        title: mockCreateProjectDto.title,
        description: mockCreateProjectDto.description,
        members: mockCreateProjectDto.members,
        due_date: new Date(mockCreateProjectDto.due_date),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, "create").mockResolvedValue(mockCreatedProject);

      const result = await controller.create(mockCreateProjectDto);

      expect(result).toEqual(mockCreatedProject);
    });
  });

  describe("findAll", () => {
    it("should return a paginated list of projects", async () => {
      const mockQueryProjectDto = {
        page: 1,
        limit: 10,
        filters: {},
        sort: {},
      } as any;

      const mockProjects: Project[] = [
        {
          id: 1,
          title: "Project 1",
          description: "Project 1 description",
          members: [],
          due_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];

      jest.spyOn(service, "findAll").mockResolvedValue(mockProjects);

      const result = await controller.findAll(mockQueryProjectDto);

      expect(result).toEqual(mockProjects);
    });
  });

  describe("findOne", () => {
    it("should return a single project by ID", async () => {
      const projectId = 1;

      const mockProject: Project = {
        id: projectId,
        title: "Project 1",
        description: "Project 1 description",
        members: [],
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, "findOne").mockResolvedValue(mockProject);

      const result = await controller.findOne(projectId);

      expect(result).toEqual(mockProject);
    });
  });

  describe("update", () => {
    it("should update a project by ID", async () => {
      const projectId = 1;
      const mockUpdateProjectDto: UpdateProjectDto = {
        title: "Updated Project",
        description: "Updated project details",
        due_date: new Date(),
      };

      const mockUpdatedProject: Project = {
        id: projectId,
        ...mockUpdateProjectDto,
        createdAt: new Date(),
      } as any;

      jest.spyOn(service, "update").mockResolvedValue(mockUpdatedProject);

      const result = await controller.update(projectId, mockUpdateProjectDto);

      expect(result).toEqual(mockUpdatedProject);
    });
  });

  describe("remove", () => {
    it("should remove a project by ID", async () => {
      const projectId = 1;

      jest.spyOn(service, "remove").mockResolvedValue(undefined);

      const result = await controller.remove(projectId);

      expect(result).toEqual({ success: true });
    });
  });
});
