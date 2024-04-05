import { RoleEntity } from "../../../../../roles/infrastructure/persistence/relational/entities/role.entity";
import { StatusEntity } from "../../../../../shared/statuses/infrastructure/persistence/relational/entities/status.entity";
import { FileEntity } from "../../../../../files/infrastructure/persistence/relational/entities/file.entity";
import { User } from "../../../../domain/user";
import { GeneralEntity } from "src/shared/entities/general.entity";
export declare class UserEntity extends GeneralEntity implements User {
    id: number;
    email: string | null;
    password?: string;
    previousPassword?: string;
    loadPreviousPassword(): void;
    provider: string;
    socialId?: string | null;
    firstName: string | null;
    lastName: string | null;
    photo?: FileEntity | null;
    role?: RoleEntity | null;
    status?: StatusEntity;
}
