import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { UserRepository } from "../infrastructure/persistence/user.repository";
import { FilesService } from "src/files/files.service";

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findManyWithPagination: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({}),
            softDelete: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: FilesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({ id: "file-id" }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it("should create a user", async () => {
    const createUserDto = {
      email: "test@test.com",
      password: "password",
      provider: "email",
      firstName: "user",
      lastName: "test",
    };
    await service.create(createUserDto);
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should return an array of users", async () => {
    const paginationOptions = { page: 1, limit: 10 };
    expect(await service.findManyWithPagination({ paginationOptions })).toEqual(
      []
    );
    expect(userRepository.findManyWithPagination).toHaveBeenCalled();
  });

  it("should return a user", async () => {
    expect(await service.findOne({ id: 1 })).toEqual({ id: 1 });
    expect(userRepository.findOne).toHaveBeenCalled();
  });
});
