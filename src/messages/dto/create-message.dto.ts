import {
  IsString,
  Validate,
  IsNotEmpty,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsBoolean,
} from "class-validator";
import { Message, MessageTypes } from "../domain/message";
import { Chat } from "src/chat/domain/chat";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
import { ApiProperty } from "@nestjs/swagger";

@ValidatorConstraint({ name: "isMessageType", async: false })
export class IsMessageType implements ValidatorConstraintInterface {
  validate(value: any) {
    return Object.values(MessageTypes).includes(value);
  }
  defaultMessage() {
    return `Type must be a valid MessageType value (${Object.values(MessageTypes)})`;
  }
}

@ValidatorConstraint({ name: "IsChatConstraint", async: false })
export class IsChatConstraint implements ValidatorConstraintInterface {
  validate(chat: any) {
    return chat && typeof chat.id === "number";
  }
  defaultMessage() {
    return "Each chat must be a user object with a numeric id";
  }
}

export class CreateMessageDto
  implements Omit<Message, GeneralDomainKeysWithId | "sender">
{
  @ApiProperty({ example: "Good morning" })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Validate(IsMessageType)
  type: MessageTypes;

  @ApiProperty()
  @Validate(IsChatConstraint)
  chat: Chat;

  @ApiProperty()
  @IsBoolean()
  seen: boolean = false;
}
