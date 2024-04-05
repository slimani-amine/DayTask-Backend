/// <reference types="multer" />
import { FilesLocalService } from './files.service';
export declare class FilesLocalController {
    private readonly filesService;
    constructor(filesService: FilesLocalService);
    uploadFile(file: Express.Multer.File): Promise<{
        file: import("src/files/domain/file").FileType;
    }>;
    download(path: any, response: any): any;
}
