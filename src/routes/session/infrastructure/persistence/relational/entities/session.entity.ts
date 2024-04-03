import {
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Session } from '../../../../domain/session';
import { GeneralEntity } from 'src/shared/entities/general.entity';

@Entity({
  name: 'session',
})
export class SessionEntity extends GeneralEntity implements Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @Index()
  user: UserEntity;

  @Column()
  hash: string;
}
