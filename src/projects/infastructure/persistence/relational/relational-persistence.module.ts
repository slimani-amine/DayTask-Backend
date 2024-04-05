import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRelationalRepository } from './repositories/projects.repository';
import { ProjectRepository } from '../projects.repository';
import { ProjectEntity } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [
    {
      provide: ProjectRepository,
      useClass: ProjectRelationalRepository,
    },
  ],
  exports: [ProjectRepository],
})
export class RelationalProjectPersistenceModule {}
