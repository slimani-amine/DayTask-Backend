import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';
export declare class Chat extends GeneralDomain {
    id: number;
    title: string;
    members: User[];
}
