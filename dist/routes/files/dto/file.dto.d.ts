/// <reference types="node" />
import { FileType } from '../domain/file';
import { UUID } from 'crypto';
export declare class FileDto implements FileType {
    id: UUID;
    path: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
