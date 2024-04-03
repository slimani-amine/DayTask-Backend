import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { successResponse } from 'src/auth/constants/response';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/routes/roles/roles.guard';
import { User as UserFromReq } from 'src/shared/decorators/user.decorator';
import { User } from '../users/domain/user';
import { NotificationService } from './notifications.service';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import { QueryNotificationsDto } from './dto/query-notifications.dto';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { Notification } from './domain/notifications';
import { NotificationsSocketGateway } from './socket/notifications-socket.gateway';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { infinityPagination } from '../../utils/infinity-pagination';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'notifications', version: '1' })
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notifSocket: NotificationsSocketGateway,
  ) {}

  @Post()
  async create(
    @Body() createDto: CreateNotificationsDto,
    @UserFromReq() user: User,
  ): Promise<Notification> {
    const notif = await this.notificationService.create(createDto, user.id);
    this.notifSocket.emitCreate(notif);
    return this.notificationService.create(createDto, user.id);
  }

  @Get()
  async findAll(
    @Query() query: QueryNotificationsDto,
    @UserFromReq() user: User,
  ): Promise<InfinityPaginationResultType<Notification>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
    try {
      const data = infinityPagination(
        await this.notificationService.findAll({
          filterOptions: query?.filters ?? null,
          sortOptions: query?.sort ?? null,
          paginationOptions: {
            page,
            limit,
          },
          userId: user.id,
        }),
        { page, limit },
      );
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTasktDto: UpdateNotificationsDto,
  ) {
    const notif = await this.notificationService.update(id, updateTasktDto);
    if (notif) {
      this.notifSocket.emitUpdate(notif);
    }
    return notif;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.notificationService.remove(id);
    return {
      ...successResponse,
    };
  }
}
