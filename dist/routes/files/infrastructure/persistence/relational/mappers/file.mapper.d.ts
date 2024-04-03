import { FileType } from '../../../../domain/file';
import { FileEntity } from '../entities/file.entity';
export declare class FileMapper {
    static toDomain(raw: FileEntity): FileType;
    static toPersistence(file: FileType): FileEntity;
}
