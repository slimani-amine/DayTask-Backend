import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../users/domain/user';
import { NotificationsRepository } from './infastructure/persistence/notifications.repository';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import { UsersService } from '../users/users.service';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import {
  FilterNotificationsDto,
  SortNotificationsDto,
} from './dto/query-notifications.dto';
import { Notification } from './domain/notifications';
import { IPaginationOptions } from '../../utils/types/pagination-options';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepo: NotificationsRepository,
    private readonly userService: UsersService,
  ) {}

  async create(
    createPayload: CreateNotificationsDto,
    user_id: User['id'],
  ): Promise<Notification> {
    const validationPromises = createPayload.receivers.map((e) =>
      this.userService.validateUser(e.id),
    );
    await Promise.all(validationPromises);
    try {
      const created = await this.notificationRepo.create({
        ...createPayload,
        sender: { id: user_id } as User,
      });
      return created;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll({
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
    return this.notificationRepo.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
      userId,
    });
  }

  async update(
    id: number,
    updatePayload: UpdateNotificationsDto,
  ): Promise<Notification | null> {
    try {
      const updated = await this.notificationRepo.update(id, updatePayload);
      return updated;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Notification doesnt exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(id: number) {
    await this.notificationRepo.softDelete(id);
  }
}
