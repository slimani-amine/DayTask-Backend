import { Module } from '@nestjs/common';
import { MessagesSocketService } from './messages-socket.service';
import { MessagesSocketGateway } from './messages-socket.gateway';

@Module({
  providers: [MessagesSocketGateway, MessagesSocketService],
  exports: [MessagesSocketGateway],
})
export class MessagesSocketModule {}
