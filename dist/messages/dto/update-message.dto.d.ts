import { CreateMessageDto } from "./create-message.dto";
import { MessageTypes } from "../domain/message";
import { Chat } from "src/chat/domain/chat";
import { User } from "src/users/domain/user";
declare const UpdateMessageDto_base: import("@nestjs/common").Type<Partial<CreateMessageDto>>;
export declare class UpdateMessageDto extends UpdateMessageDto_base {
    type: MessageTypes;
    chat: Chat;
    sender: User;
}
export {};
