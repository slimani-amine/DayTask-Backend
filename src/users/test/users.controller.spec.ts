import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findManyWithPagination: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll({})).toEqual({ data: [], meta: {} });
    expect(service.findManyWithPagination).toHaveBeenCalled();
  });

  it('should return a user', async () => {
    expect(await controller.findOne('1')).toEqual({ id: 1 });
    expect(service.findOne).toHaveBeenCalled();
  });
});
