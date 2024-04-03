import { Chat } from 'src/routes/chat/domain/chat';
import { User } from 'src/routes/users/domain/user';
import { GeneralDomain } from 'src/shared/domain/general.domain';

export class Message extends GeneralDomain {
  id: number;
  content: string;
  type: MessageTypes;
  seen: boolean;
  chat: Chat;
  sender: User;
}

export enum MessageTypes {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  VIDEO = 'video',
  AUDIO = 'audio',
}
