import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "../tasks.controller";
import { TasksService } from "../tasks.service";
import { successResponse } from "src/auth/constants/response";
import { ProjectEntity } from "src/projects/infastructure/persistence/relational/entities/project.entity";
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";

describe("TasksController", () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it("should create a task", async () => {
    const project = new ProjectEntity();
    const user = new UserEntity();
    const createTaskDto = {
      title: "Test Task",
      description: "Test Description",
      projectId: project.id,
      due_date: new Date(),
      members: [user],
      completedAt: new Date(),
      completed: false,
      startedAt: new Date(),
      project,
    };
    expect(await controller.create(createTaskDto)).toEqual({});
    expect(service.create).toHaveBeenCalledWith(createTaskDto);
  });

  it("should return an array of tasks", async () => {
    const query = { page: 1, limit: 10 };
    expect(await controller.findAll(query)).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it("should return a task", async () => {
    expect(await controller.findOne(1)).toEqual({ id: 1 });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it("should update a task", async () => {
    const updateTaskDto = {
      title: "Updated Task",
      description: "Updated Description",
    };
    expect(await controller.update(1, updateTaskDto)).toEqual({});
    expect(service.update).toHaveBeenCalledWith(1, updateTaskDto);
  });

  it("should remove a task", async () => {
    expect(await controller.remove(1)).toEqual({ ...successResponse });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
