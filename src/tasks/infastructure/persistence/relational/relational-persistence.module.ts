import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRelationalRepository } from './repositories/tasks.repository';
import { TaskRepository } from '../tasks.repository';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [
    {
      provide: TaskRepository,
      useClass: TaskRelationalRepository,
    },
  ],
  exports: [TaskRepository],
})
export class RelationalTaskPersistenceModule {}
