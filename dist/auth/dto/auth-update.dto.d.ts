import { FileDto } from 'src/routes/files/dto/file.dto';
export declare class AuthUpdateDto {
    photo?: FileDto | null;
    firstName?: string;
    lastName?: string;
    password?: string;
    oldPassword?: string;
}
