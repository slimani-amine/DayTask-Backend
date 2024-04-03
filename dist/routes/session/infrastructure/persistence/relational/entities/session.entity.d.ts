import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Session } from '../../../../domain/session';
import { GeneralEntity } from 'src/shared/entities/general.entity';
export declare class SessionEntity extends GeneralEntity implements Session {
    id: number;
    user: UserEntity;
    hash: string;
}
