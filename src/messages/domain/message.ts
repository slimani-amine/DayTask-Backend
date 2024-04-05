import { Chat } from "src/chat/domain/chat";
import { User } from "src/users/domain/user";
import { GeneralDomain } from "src/shared/domain/general.domain";

export class Message extends GeneralDomain {
  id: number;
  content: string;
  type: MessageTypes;
  seen: boolean;
  chat: Chat;
  sender: User;
}

export enum MessageTypes {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  VIDEO = "video",
  AUDIO = "audio",
}
