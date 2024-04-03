import { MessagesSocketService } from './messages-socket.service';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/routes/messages/domain/message';
export declare class MessagesSocketGateway {
    private readonly messagesSocketService;
    server: Server;
    constructor(messagesSocketService: MessagesSocketService);
    healthcheck(): string;
    emitCreate(payload: Message): void;
    emitUpdate(payload: Message): void;
    joinRoom(name: string, client: Socket): void;
    typing(): void;
}
