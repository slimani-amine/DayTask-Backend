import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { NotificationEntity } from '../entities/notifications.entity';
import { NotificationsRepository } from '../../notifications.repository';
import { Notification } from 'src/routes/notifications/domain/notifications';
import { NotificationsMapper } from '../mappers/notifications.mapper';
import {
  FilterNotificationsDto,
  SortNotificationsDto,
} from 'src/routes/notifications/dto/query-notifications.dto';
import { User } from 'src/routes/users/domain/user';

@Injectable()
export class NotificationsRelationalRepository
  implements NotificationsRepository
{
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepo: Repository<NotificationEntity>,
  ) {}

  async create(data: Notification): Promise<Notification> {
    const persistenceModel = NotificationsMapper.toPersistence(data);
    const newEntity = await this.notificationsRepo.save(
      this.notificationsRepo.create(persistenceModel),
    );
    return NotificationsMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
    userId,
  }: {
    filterOptions?: FilterNotificationsDto | null;
    sortOptions?: SortNotificationsDto[] | null;
    paginationOptions: IPaginationOptions;
    userId: User['id'];
  }): Promise<Notification[]> {
    const entities = await this.notificationsRepo
      .createQueryBuilder('notification')
      .innerJoinAndSelect(
        'notification.receivers',
        'receiver',
        'receiver.id = :userId',
        { userId },
      )
      .leftJoinAndSelect('notification.sender', 'user')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .where(filterOptions ?? {})
      .orderBy(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [`notification.${sort.orderBy}`]: sort.order,
          }),
          {},
        ) ?? {},
      )
      .getMany();
    return entities.map((user) => {
      if (user.hasOwnProperty('receivers')) {
        delete (user as { receivers?: unknown }).receivers;
      }
      return NotificationsMapper.toDomain(user);
    });
  }

  async findOne(
    fields: EntityCondition<Notification>,
  ): Promise<NullableType<Notification>> {
    const entity = await this.notificationsRepo.findOne({
      where: fields as FindOptionsWhere<NotificationEntity>,
    });

    return entity ? NotificationsMapper.toDomain(entity) : null;
  }

  async update(
    id: Notification['id'],
    payload: Partial<Notification>,
  ): Promise<Notification> {
    const entity = await this.notificationsRepo.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new BadRequestException('Notification not found');
    }

    const updatedEntity = await this.notificationsRepo.save(
      this.notificationsRepo.create(
        NotificationsMapper.toPersistence({
          ...NotificationsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NotificationsMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Notification['id']): Promise<void> {
    await this.notificationsRepo.softDelete(id);
  }
}
