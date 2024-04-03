import { RoleDto } from 'src/routes/roles/dto/role.dto';
import { StatusDto } from 'src/shared/statuses/dto/status.dto';
import { FileDto } from 'src/routes/files/dto/file.dto';
import { User } from '../domain/user';
import { GeneralDomainKeysWithId } from 'src/shared/domain/general.domain';
export declare class CreateUserDto implements Omit<User, GeneralDomainKeysWithId> {
    email: string | null;
    password?: string;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileDto | null;
    role?: RoleDto | null;
    status?: StatusDto;
    hash?: string | null;
}
