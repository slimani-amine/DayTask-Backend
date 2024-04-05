import { Project } from "src/projects/domain/project";
import { GeneralEntity } from "src/shared/entities/general.entity";
import { UserEntity } from "src/users/infrastructure/persistence/relational/entities/user.entity";
export declare class ProjectEntity extends GeneralEntity implements Project {
    id: number;
    title: string;
    description: string | null;
    members: UserEntity[];
    due_date: Date;
}
