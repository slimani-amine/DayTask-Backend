import { IsString, IsArray, ArrayNotEmpty, Validate } from "class-validator";
import { IsUserConstraint } from "src/projects/dto/create-project.dto";
import { User } from "src/users/domain/user";
import { Chat } from "../domain/chat";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChatDto implements Omit<Chat, GeneralDomainKeysWithId> {
  @ApiProperty({ example: "Task title" })
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUserConstraint, { each: true })
  members: User[];
}
