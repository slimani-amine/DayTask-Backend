import { FileType } from 'src/routes/files/domain/file';
import { Role } from 'src/routes/roles/domain/role';
import { GeneralDomain } from 'src/shared/domain/general.domain';
import { Status } from 'src/shared/statuses/domain/status';
export declare class User extends GeneralDomain {
    id: number | string;
    email: string | null;
    password?: string;
    previousPassword?: string;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileType | null;
    role?: Role | null;
    status?: Status;
}
