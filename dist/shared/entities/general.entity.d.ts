import { EntityRelationalHelper } from '../../utils/relational-entity-helper';
export declare class GeneralEntity extends EntityRelationalHelper {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
