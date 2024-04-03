import { GeneralEntity } from 'src/shared/entities/general.entity';
import { UserEntity } from 'src/routes/users/infrastructure/persistence/relational/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from 'src/routes/chat/domain/chat';
@Entity({
  name: 'task',
})
export class ChatEntity extends GeneralEntity implements Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @ManyToMany(() => UserEntity, {
    eager: true,
  })
  @JoinTable()
  members: UserEntity[];
}
