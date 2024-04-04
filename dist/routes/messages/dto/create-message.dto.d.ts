import { ValidatorConstraintInterface } from "class-validator";
import { Message, MessageTypes } from "../domain/message";
import { Chat } from "src/routes/chat/domain/chat";
import { GeneralDomainKeysWithId } from "src/shared/domain/general.domain";
export declare class IsMessageType implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(): string;
}
export declare class IsChatConstraint implements ValidatorConstraintInterface {
    validate(chat: any): any;
    defaultMessage(): string;
}
export declare class CreateMessageDto implements Omit<Message, GeneralDomainKeysWithId | "sender"> {
    content: string;
    type: MessageTypes;
    chat: Chat;
    seen: boolean;
}
