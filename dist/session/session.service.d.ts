import { User } from "src/users/domain/user";
import { EntityCondition } from "src/utils/types/entity-condition.type";
import { SessionRepository } from "./infrastructure/persistence/session.repository";
import { Session } from "./domain/session";
import { NullableType } from "src/utils/types/nullable.type";
export declare class SessionService {
    private readonly sessionRepository;
    constructor(sessionRepository: SessionRepository);
    findOne(options: EntityCondition<Session>): Promise<NullableType<Session>>;
    create(data: Omit<Session, "id" | "createdAt" | "updatedAt" | "deletedAt">): Promise<Session>;
    update(id: Session["id"], payload: Partial<Omit<Session, "id" | "createdAt" | "updatedAt" | "deletedAt">>): Promise<Session | null>;
    softDelete(criteria: {
        id?: Session["id"];
        user?: Pick<User, "id">;
        excludeId?: Session["id"];
    }): Promise<void>;
}
