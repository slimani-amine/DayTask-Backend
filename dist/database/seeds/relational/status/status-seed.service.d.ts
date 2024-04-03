import { Repository } from 'typeorm';
import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
export declare class StatusSeedService {
    private repository;
    constructor(repository: Repository<StatusEntity>);
    run(): Promise<void>;
}
