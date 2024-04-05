import { Repository } from "typeorm";
import { RoleEntity } from "../../../../roles/infrastructure/persistence/relational/entities/role.entity";
export declare class RoleSeedService {
    private repository;
    constructor(repository: Repository<RoleEntity>);
    run(): Promise<void>;
}
