import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Notification } from '../domain/notifications';
import { NotificationsSocketService } from './notifications-socket.service';

@WebSocketGateway({
  namespace: 'NotificationsSoket',
  cors: {
    origin: '*',
  },
})
export class NotificationsSocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly notifSocketService: NotificationsSocketService,
  ) {}

  @SubscribeMessage('healthcheck')
  healthcheck() {
    return 'Ok';
  }

  emitCreate(payload: Notification): void {
    this.server.emit('post', payload);
  }

  emitUpdate(payload: Notification): void {
    this.server.emit('patch', payload);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('🚀 ~ MessagesSocketGateway ~ client:', client);
    console.log('🚀 ~ MessagesSocketGateway ~ name:', name);
  }
}
