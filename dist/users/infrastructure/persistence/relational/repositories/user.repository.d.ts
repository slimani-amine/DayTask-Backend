import { EntityCondition } from "src/utils/types/entity-condition.type";
import { IPaginationOptions } from "src/utils/types/pagination-options";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { NullableType } from "../../../../../utils/types/nullable.type";
import { FilterUserDto, SortUserDto } from "../../../../dto/query-user.dto";
import { User } from "../../../../domain/user";
import { UserRepository } from "../../user.repository";
export declare class UsersRelationalRepository implements UserRepository {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(data: User): Promise<User>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]>;
    findOne(fields: EntityCondition<User>): Promise<NullableType<User>>;
    update(id: User["id"], payload: Partial<User>): Promise<User>;
    softDelete(id: User["id"]): Promise<void>;
}
