import { FileType } from '../../../../domain/file';
import { FileSchemaClass } from '../entities/file.schema';
export declare class FileMapper {
    static toDomain(raw: FileSchemaClass): FileType;
    static toPersistence(file: any): FileSchemaClass;
}
