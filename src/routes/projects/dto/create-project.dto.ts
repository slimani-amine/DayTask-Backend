import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
  ArrayNotEmpty,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from "class-validator";
import { User } from "src/routes/users/domain/user";
import { Project } from "../domain/project";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { ApiProperty } from "@nestjs/swagger";

@ValidatorConstraint({ async: true })
export class IsUserConstraint implements ValidatorConstraintInterface {
  validate(user: any) {
    return user && typeof user.id === "number";
  }
  defaultMessage() {
    return "Each member must be a user object with a numeric id";
  }
}
export class CreateProjectDto
  implements Omit<Project, GeneralDomainKeysWithId>
{
  @ApiProperty({ example: "Project Title" })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "Project Description" })
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUserConstraint, { each: true })
  members;

  @ApiProperty({ example: "2024-04-05T14:30:00Z" })
  @IsNotEmpty()
  @IsDateString()
  due_date: Date | string;
}
