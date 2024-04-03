import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../utils/relational-entity-helper';

export class GeneralEntity extends EntityRelationalHelper {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
