import { FileRepository } from "../../persistence/file.repository";
import { FileType } from "src/files/domain/file";
import { FileUploadDto } from "./dto/file.dto";
import { ConfigService } from "@nestjs/config";
export declare class FilesS3PresignedService {
    private readonly fileRepository;
    private readonly configService;
    private s3;
    constructor(fileRepository: FileRepository, configService: ConfigService);
    create(file: FileUploadDto): Promise<{
        file: FileType;
        uploadSignedUrl: string;
    }>;
}
