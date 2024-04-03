/// <reference types="node" />
import { UUID } from 'crypto';
import { GeneralEntity } from 'src/shared/entities/general.entity';
export declare class FileEntity extends GeneralEntity {
    id: UUID;
    path: string;
}
