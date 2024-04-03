import { Session } from '../../../../domain/session';
import { SessionEntity } from '../entities/session.entity';
export declare class SessionMapper {
    static toDomain(raw: SessionEntity): Session;
    static toPersistence(session: Session): SessionEntity;
}
