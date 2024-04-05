import { Server, Socket } from 'socket.io';
import { Notification } from '../domain/notifications';
import { NotificationsSocketService } from './notifications-socket.service';
export declare class NotificationsSocketGateway {
    private readonly notifSocketService;
    server: Server;
    constructor(notifSocketService: NotificationsSocketService);
    healthcheck(): string;
    emitCreate(payload: Notification): void;
    emitUpdate(payload: Notification): void;
    joinRoom(name: string, client: Socket): void;
}
