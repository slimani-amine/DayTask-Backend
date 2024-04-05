import { Module } from '@nestjs/common';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { RelationalNotificationPersistenceModule } from './infastructure/persistence/relational/relational-persistence.module';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { UsersModule } from '../users/users.module';
import { NotificationsSocketModule } from './socket/notifications-socket.module';
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentNotificationPersistenceModule {}
  : RelationalNotificationPersistenceModule;
@Module({
  imports: [
    infrastructurePersistenceModule,
    UsersModule,
    NotificationsSocketModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService, infrastructurePersistenceModule],
})
export class NotificationModule {}
