import { User } from '../domain/user';
import { SortDto } from 'src/shared/dto/sort.dto';
import { QueryDto } from 'src/shared/dto/query.dto';
import { UserEntity } from '../infrastructure/persistence/relational/entities/user.entity';
import { FindOptionsWhere } from 'typeorm';

export type FilterUserDto = FindOptionsWhere<UserEntity>;

export class SortUserDto extends SortDto<User> {}

export class QueryUserDto extends QueryDto<User, FilterUserDto> {}
