import {
  IsDateString,
  IsOptional,
  IsString,
  IsBoolean,
  IsArray,
  IsNumber,
  ArrayNotEmpty,
  Validate,
} from "class-validator";
import { IsUserConstraint } from "src/projects/dto/create-project.dto";
import { ProjectEntity } from "src/projects/infastructure/persistence/relational/entities/project.entity";
import { User } from "src/users/domain/user";
import { Task } from "../domain/task";
import { Exclude } from "class-transformer";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { Project } from "../../projects/domain/project";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto implements Omit<Task, GeneralDomainKeysWithId> {
  @ApiProperty({ example: "Task title" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Task description" })
  @IsString()
  @IsOptional()
  description: string | null = null;

  @ApiProperty({ example: 1 })
  @IsNumber()
  projectId: ProjectEntity["id"];
  @Exclude()
  project?: Project;

  @ApiProperty({ example: "2024-04-05T14:30:00Z" })
  @IsDateString()
  @IsOptional()
  due_date: Date | string | null = null;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUserConstraint, { each: true })
  members;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;

  @ApiProperty({ example: "2024-04-05T14:30:00Z" })
  @IsDateString()
  @IsOptional()
  completedAt: Date | null = null;

  @ApiProperty({ example: "2024-04-05T14:30:00Z" })
  @IsDateString()
  @IsOptional()
  startedAt: Date | null = null;
}
