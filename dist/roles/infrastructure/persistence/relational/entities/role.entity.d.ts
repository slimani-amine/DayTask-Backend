import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Role } from '../../../../domain/role';
export declare class RoleEntity extends EntityRelationalHelper implements Role {
    id: number;
    name?: string;
}
