import { FilesS3PresignedService } from './files.service';
import { FileUploadDto } from './dto/file.dto';
export declare class FilesS3PresignedController {
    private readonly filesService;
    constructor(filesService: FilesS3PresignedService);
    uploadFile(file: FileUploadDto): Promise<{
        file: import("src/files/domain/file").FileType;
        uploadSignedUrl: string;
    }>;
}
