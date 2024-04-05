import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileRepository } from './infrastructure/persistence/file.repository';
import { FileType } from './domain/file';
export declare class FilesService {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>>;
}
