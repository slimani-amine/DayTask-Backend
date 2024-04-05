import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notifications.entity';
import { NotificationsRepository } from '../notifications.repository';
import { NotificationsRelationalRepository } from './repositories/notifications.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  providers: [
    {
      provide: NotificationsRepository,
      useClass: NotificationsRelationalRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class RelationalNotificationPersistenceModule {}
