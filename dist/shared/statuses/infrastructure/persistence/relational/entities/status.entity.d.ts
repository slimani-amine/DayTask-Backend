import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Status } from '../../../../domain/status';
export declare class StatusEntity extends EntityRelationalHelper implements Status {
    id: number;
    name?: string;
}
