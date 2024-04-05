import { User } from "src/users/domain/user";
import { GeneralDomain } from "src/shared/domain/general.domain";
export declare class Session extends GeneralDomain {
    id: number | string;
    user: User;
    hash: string;
}
