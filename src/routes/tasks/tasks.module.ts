import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { RelationalTaskPersistenceModule } from './infastructure/persistence/relational/relational-persistence.module';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { ProjectsModule } from 'src/routes/projects/projects.module';
import { UsersModule } from 'src/routes/users/users.module';
import { ValidateData } from '../../utils/validation/vlalidate-data';
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentChatPersistenceModule {}
  : RelationalTaskPersistenceModule;
@Module({
  imports: [infrastructurePersistenceModule, ProjectsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, ValidateData],
  exports: [TasksService, infrastructurePersistenceModule],
})
export class TasksModule {}
