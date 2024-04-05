import { PartialType } from "@nestjs/swagger";
import { CreateMessageDto } from "./create-message.dto";
import { Exclude } from "class-transformer";
import { MessageTypes } from "../domain/message";
import { Chat } from "src/chat/domain/chat";
import { User } from "src/users/domain/user";

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Exclude()
  type: MessageTypes;

  @Exclude()
  chat: Chat;

  @Exclude()
  sender: User;
}
