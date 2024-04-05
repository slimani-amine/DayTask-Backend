import { Module } from '@nestjs/common';
import { MessageService } from './Message.service';
import { MessageController } from './Message.controller';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { RelationalMessagePersistenceModule } from './infastructure/persistence/relational/relational-persistence.module';
import { ChatModule } from '../chat/chat.module';
import { MessagesSocketModule } from './socket/messages-socket.module';
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentMessagePersistenceModule {}
  : RelationalMessagePersistenceModule;
@Module({
  imports: [infrastructurePersistenceModule, ChatModule, MessagesSocketModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService, infrastructurePersistenceModule],
})
export class MessageModule {}
