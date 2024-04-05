import { CreateUserDto } from "./create-user.dto";
import { RoleDto } from "src/roles/dto/role.dto";
import { StatusDto } from "src/shared/statuses/dto/status.dto";
import { FileDto } from "src/files/dto/file.dto";
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string | null;
    password?: string;
    provider?: string;
    socialId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    photo?: FileDto | null;
    role?: RoleDto | null;
    status?: StatusDto;
    hash?: string | null;
}
export {};
