import { ValidatorConstraintInterface } from "class-validator";
import { Project } from "../domain/project";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
export declare class IsUserConstraint implements ValidatorConstraintInterface {
    validate(user: any): any;
    defaultMessage(): string;
}
export declare class CreateProjectDto implements Omit<Project, GeneralDomainKeysWithId> {
    title: string;
    description: string;
    members: any;
    due_date: Date | string;
}
