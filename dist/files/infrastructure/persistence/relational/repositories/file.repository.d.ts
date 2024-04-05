import { FileEntity } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FileRepository } from '../../file.repository';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { FileType } from '../../../../domain/file';
export declare class FileRelationalRepository implements FileRepository {
    private readonly fileRepository;
    constructor(fileRepository: Repository<FileEntity>);
    create(data: FileType): Promise<FileType>;
    findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>>;
}
