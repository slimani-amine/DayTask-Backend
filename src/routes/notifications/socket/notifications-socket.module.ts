import { Module } from '@nestjs/common';
import { NotificationsSocketService } from './notifications-socket.service';
import { NotificationsSocketGateway } from './notifications-socket.gateway';

@Module({
  providers: [NotificationsSocketGateway, NotificationsSocketService],
  exports: [NotificationsSocketGateway],
})
export class NotificationsSocketModule {}
