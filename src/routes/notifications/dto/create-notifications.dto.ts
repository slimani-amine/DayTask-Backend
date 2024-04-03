import {
  IsString,
  Validate,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { GeneralDomainKeysWithId } from 'src/shared/domain/general.domain';
import { Notification } from '../domain/notifications';
import { IsUserConstraint } from 'src/routes/projects/dto/create-project.dto';
import { User } from 'src/routes/users/domain/user';

export class CreateNotificationsDto
  implements Omit<Notification, GeneralDomainKeysWithId | 'sender'>
{
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  seen: boolean = false;

  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUserConstraint, { each: true })
  receivers: User[];
}
