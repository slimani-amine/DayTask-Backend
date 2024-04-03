import { ProjectEntity } from 'src/routes/projects/infastructure/persistence/relational/entities/project.entity';
import { GeneralEntity } from 'src/shared/entities/general.entity';
import { Task } from 'src/routes/tasks/domain/task';
import { UserEntity } from 'src/routes/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({
  name: 'task',
})
export class TaskEntity extends GeneralEntity implements Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @ManyToOne(() => ProjectEntity, {
    eager: true,
  })
  @JoinTable()
  project: ProjectEntity;

  @Column({ type: 'timestamp', nullable: true, default: null })
  due_date: Date;

  @ManyToMany(() => UserEntity, {
    eager: true,
  })
  @JoinTable()
  members: UserEntity[];

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  completedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;
}
