import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'typeorm';

export abstract class GeneralRepositoryType<Domain, Filter, Sort, DomainId> {
  abstract create(
    data: Omit<Domain, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Domain>;

  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: Filter | null;
    sortOptions?: Sort[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Domain[]>;

  abstract findOne(
    fields: EntityCondition<Domain>,
  ): Promise<NullableType<Domain>>;

  abstract update(
    id: DomainId,
    payload: DeepPartial<Domain>,
  ): Promise<Domain | null>;

  abstract softDelete(id: DomainId): Promise<void>;
}
