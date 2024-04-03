import { Repository } from 'typeorm';
import { UserEntity } from '../../../../routes/users/infrastructure/persistence/relational/entities/user.entity';
export declare class UserSeedService {
    private repository;
    constructor(repository: Repository<UserEntity>);
    run(): Promise<void>;
}
