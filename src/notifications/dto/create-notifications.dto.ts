import {
  IsString,
  Validate,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { Notification } from "../domain/notifications";
import { IsUserConstraint } from "src/projects/dto/create-project.dto";
import { User } from "src/users/domain/user";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationsDto
  implements Omit<Notification, GeneralDomainKeysWithId | "sender">
{
  @ApiProperty({ example: "Ali Send a message" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsBoolean()
  seen: boolean = false;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUserConstraint, { each: true })
  receivers: User[];
}
