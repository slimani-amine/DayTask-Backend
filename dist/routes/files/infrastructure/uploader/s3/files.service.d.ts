/// <reference types="multer-s3" />
import { FileRepository } from '../../persistence/file.repository';
import { FileType } from 'src/routes/files/domain/file';
export declare class FilesS3Service {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    create(file: Express.MulterS3.File): Promise<{
        file: FileType;
    }>;
}
