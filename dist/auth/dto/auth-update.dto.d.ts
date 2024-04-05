import { FileDto } from "src/files/dto/file.dto";
export declare class AuthUpdateDto {
    photo?: FileDto | null;
    firstName?: string;
    lastName?: string;
    password?: string;
    oldPassword?: string;
}
