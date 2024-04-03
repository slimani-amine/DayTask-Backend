import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './domain/task';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const mockCreateTaskDto: CreateTaskDto = {
        title: 'New Task',
        projectId: 1,
        members: [],
        due_date: new Date(),
        completed: false,
        description: null,
        project: {
          id: 1,
          title: 'Project Title',
          description: 'Project Description',
          members: [],
          due_date: new Date(),
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
        },
        completedAt: null,
        startedAt: null,
      };

      const mockCreatedTask: Task = {
        id: 1,
        title: mockCreateTaskDto.title,
        description: mockCreateTaskDto.description,
        members: mockCreateTaskDto.members,
        project: {
          id: 1,
          title: 'Project Title',
          description: 'Project Description',
          members: [],
          due_date: new Date(),
          updatedAt: new Date(),
          createdAt: new Date(),
          deletedAt: null,
        },
        due_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCreatedTask);

      const result = await controller.create(mockCreateTaskDto);

      expect(result).toEqual(mockCreatedTask);
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of tasks', async () => {
      const mockQueryTaskDto = {
        page: 1,
        limit: 10,
        filters: {},
        sort: {},
      };

      const mockTasks: Task[] = []; // Mock your tasks array here

      jest.spyOn(service, 'findAll').mockResolvedValue(mockTasks);

      const result = await controller.findAll(mockQueryTaskDto);

      expect(result).toEqual(mockTasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task by ID', async () => {
      const taskId = 1;

      const mockTask: Task = {
        id: taskId,
        title: 'Task 1',
        projectId: 1,
        members: [],
        due_date: new Date(),
        completed: false,
        completedAt: null,
        startedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockTask);

      const result = await controller.findOne(taskId);

      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should update a task by ID', async () => {
      const taskId = 1;
      const mockUpdateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated task details',
        projectId: 1,
        members: [],
        due_date: new Date(),
        completed: false,
        completedAt: null,
        startedAt: null,
      };

      const mockUpdatedTask: Task = {
        id: taskId,
        ...mockUpdateTaskDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedTask);

      const result = await controller.update(taskId, mockUpdateTaskDto);

      expect(result).toEqual(mockUpdatedTask);
    });
  });

  describe('remove', () => {
    it('should remove a task by ID', async () => {
      const taskId = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      const result = await controller.remove(taskId);
      expect(result).toEqual({ success: true });
    });
  });
});
