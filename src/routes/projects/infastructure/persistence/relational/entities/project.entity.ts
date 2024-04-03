import { Project } from 'src/routes/projects/domain/project';
import { GeneralEntity } from 'src/shared/entities/general.entity';
import { UserEntity } from 'src/routes/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({
  name: 'project',
})
export class ProjectEntity extends GeneralEntity implements Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToMany(() => UserEntity, {
    eager: true,
  })
  @JoinTable()
  members: UserEntity[];

  @Column({ type: 'timestamp' })
  due_date: Date;
}
