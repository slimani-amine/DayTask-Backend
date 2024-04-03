import { Status } from '../../../../domain/status';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
export declare class StatusEntity extends EntityRelationalHelper implements Status {
    id: number;
    name?: string;
}
