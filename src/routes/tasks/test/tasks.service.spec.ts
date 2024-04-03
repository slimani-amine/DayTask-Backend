import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { ProjectsService } from 'src/routes/projects/projects.service';
import { TaskRepository } from '../infastructure/persistence/tasks.repository';
../../utils/validation/vlalidate-dataimport { ProjectEntity } from 'src/routes/projects/infastructure/persistence/relational/entities/project.entity';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: TaskRepository;
  let validateData: ValidateData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findManyWithPagination: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({}),
            softDelete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: ProjectsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: 1, members: [] }),
          },
        },
        {
          provide: ValidateData,
          useValue: {
            vlaidateMembers: jest.fn().mockResolvedValue(undefined),
            validateProjectId: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
    validateData = module.get<ValidateData>(ValidateData);
  });

  it('should create a task', async () => {
    const project = new ProjectEntity();
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      projectId: 1,
      due_date: new Date(),
      members: [],
      completedAt: new Date(),
      completed: false,
      startedAt: new Date(),
      project,
    };
    expect(await service.create(createTaskDto)).toEqual({});
    expect(taskRepository.create).toHaveBeenCalledWith({
      ...createTaskDto,
      project: { id: createTaskDto.projectId },
    });
    expect(validateData.vlaidateMembers).toHaveBeenCalledWith(
      createTaskDto.members,
    );
    expect(validateData.validateProjectId).toHaveBeenCalledWith(
      createTaskDto.projectId,
    );
  });

  it('should return an array of tasks', async () => {
    const paginationOptions = { page: 1, limit: 10 };
    expect(await service.findAll({ paginationOptions })).toEqual([]);
    expect(taskRepository.findManyWithPagination).toHaveBeenCalled();
  });

  it('should return a task', async () => {
    expect(await service.findOne(1)).toEqual({ id: 1 });
    expect(taskRepository.findOne).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a task', async () => {
    const updateTaskDto = {
      title: 'Updated Task',
      description: 'Updated Description',
      projectId: 1,
      due_date: new Date(),
      members: [],
      completedAt: new Date(),
      completed: false,
      startedAt: new Date(),
    };
    expect(await service.update(1, updateTaskDto)).toEqual({});
    expect(taskRepository.update).toHaveBeenCalledWith(1, updateTaskDto);
    if (updateTaskDto.projectId) {
      expect(validateData.validateProjectId).toHaveBeenCalledWith(
        updateTaskDto.projectId,
      );
    }
    if (updateTaskDto.members) {
      expect(validateData.vlaidateMembers).toHaveBeenCalledWith(
        updateTaskDto.members,
      );
    }
  });

  it('should remove a task', async () => {
    await service.remove(1);
    expect(taskRepository.softDelete).toHaveBeenCalledWith(1);
  });
});
