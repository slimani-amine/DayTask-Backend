import {
  IsString,
  Validate,
  IsNotEmpty,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  IsBoolean,
} from 'class-validator';
import { Message, MessageTypes } from '../domain/message';
import { Chat } from 'src/routes/chat/domain/chat';
import { GeneralDomainKeysWithId } from 'src/shared/domain/general.domain';

@ValidatorConstraint({ name: 'isMessageType', async: false })
export class IsMessageType implements ValidatorConstraintInterface {
  validate(value: any) {
    return Object.values(MessageTypes).includes(value);
  }
  defaultMessage() {
    return `Type must be a valid MessageType value (${Object.values(MessageTypes)})`;
  }
}

@ValidatorConstraint({ name: 'IsChatConstraint', async: false })
export class IsChatConstraint implements ValidatorConstraintInterface {
  validate(chat: any) {
    return chat && typeof chat.id === 'number'; // chat if user is an instance of Chat
  }
  defaultMessage() {
    return 'Each chat must be a user object with a numeric id';
  }
}

export class CreateMessageDto
  implements Omit<Message, GeneralDomainKeysWithId | 'sender'>
{
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsMessageType)
  type: MessageTypes;

  @Validate(IsChatConstraint)
  chat: Chat;

  @IsBoolean()
  seen: boolean = false;
}
