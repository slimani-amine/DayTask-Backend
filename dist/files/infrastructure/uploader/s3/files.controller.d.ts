/// <reference types="multer-s3" />
import { FilesS3Service } from './files.service';
export declare class FilesS3Controller {
    private readonly filesService;
    constructor(filesService: FilesS3Service);
    uploadFile(file: Express.MulterS3.File): Promise<{
        file: import("src/files/domain/file").FileType;
    }>;
}
