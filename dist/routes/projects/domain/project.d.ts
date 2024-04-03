import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';
export declare class Project extends GeneralDomain {
    id: number;
    title: string;
    description: string | null;
    members: User[];
    due_date: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
