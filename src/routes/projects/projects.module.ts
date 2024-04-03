import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { RelationalProjectPersistenceModule } from './infastructure/persistence/relational/relational-persistence.module';
import databaseConfig from 'src/database/config/database.config';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { UsersModule } from 'src/routes/users/users.module';
const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? class DocumentProjectPersistenceModule {}
  : RelationalProjectPersistenceModule;
@Module({
  imports: [infrastructurePersistenceModule, UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService, infrastructurePersistenceModule],
})
export class ProjectsModule {}
