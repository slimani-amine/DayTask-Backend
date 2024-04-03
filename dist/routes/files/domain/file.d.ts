/// <reference types="node" />
import { UUID } from 'crypto';
import { GeneralDomain } from 'src/shared/domain/general.domain';
export declare class FileType extends GeneralDomain {
    id: UUID;
    path: string;
}
