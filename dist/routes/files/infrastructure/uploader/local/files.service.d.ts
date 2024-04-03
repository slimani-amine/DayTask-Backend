/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { FileRepository } from '../../persistence/file.repository';
import { FileType } from 'src/routes/files/domain/file';
export declare class FilesLocalService {
    private readonly configService;
    private readonly fileRepository;
    constructor(configService: ConfigService<AllConfigType>, fileRepository: FileRepository);
    create(file: Express.Multer.File): Promise<{
        file: FileType;
    }>;
}
