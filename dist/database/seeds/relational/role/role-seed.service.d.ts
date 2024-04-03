import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../routes/roles/infrastructure/persistence/relational/entities/role.entity';
export declare class RoleSeedService {
    private repository;
    constructor(repository: Repository<RoleEntity>);
    run(): Promise<void>;
}
