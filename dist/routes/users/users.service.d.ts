/// <reference types="node" />
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
import { UserRepository } from './infrastructure/persistence/user.repository';
import { User } from './domain/user';
import { FilesService } from 'src/routes/files/files.service';
import { UUID } from 'crypto';
import { FileDto } from 'src/routes/files/dto/file.dto';
import { RoleDto } from 'src/routes/roles/dto/role.dto';
import { StatusDto } from 'src/shared/statuses/dto/status.dto';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { NullableType } from '../../utils/types/nullable.type';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { DeepPartial } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    private readonly filesService;
    constructor(usersRepository: UserRepository, filesService: FilesService);
    create(createProfileDto: CreateUserDto): Promise<User>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]>;
    findOne(fields: EntityCondition<User>): Promise<NullableType<User>>;
    update(id: User['id'], payload: DeepPartial<User>): Promise<User | null>;
    softDelete(id: User['id']): Promise<void>;
    getFileObject(photoId: UUID): Promise<FileDto>;
    vlaidteRole(role: RoleDto | null | undefined): void;
    validateStatus(status: StatusDto | null | undefined): void;
    validateUser(userId: User['id']): Promise<void>;
}
