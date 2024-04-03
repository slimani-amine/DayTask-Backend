import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../users/domain/user';
import { MessageRepository } from './infastructure/persistence/Message.repository';
import { Message } from './domain/message';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilterMessageDto, SortMessageDto } from './dto/query-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Chat } from '../chat/domain/chat';
import { ChatService } from '../chat/chat.service';
import { IPaginationOptions } from '../../utils/types/pagination-options';

@Injectable()
export class MessageService {
  constructor(
    private readonly msgRepository: MessageRepository,
    private readonly chatService: ChatService,
  ) {}

  async create(
    createPayload: CreateMessageDto,
    user_id: User['id'],
  ): Promise<Message> {
    await this.validateChat(createPayload.chat.id, user_id);
    try {
      const created = await this.msgRepository.create({
        ...createPayload,
        sender: { id: user_id } as User,
      });
      return created;
    } catch (err) {
      console.log('🚀 ~ MessageService ~ err:', err);
      throw new BadRequestException(err.message);
    }
  }

  async findAll({
    filterOptions,
    sortOptions,
    paginationOptions,
    chatId,
  }: {
    filterOptions?: FilterMessageDto | null;
    sortOptions?: SortMessageDto[] | null;
    paginationOptions: IPaginationOptions;
    chatId: Chat['id'];
  }): Promise<Message[]> {
    return this.msgRepository.findManyWithPagination({
      filterOptions: { ...filterOptions, chat: { id: chatId as number } },
      sortOptions,
      paginationOptions,
    });
  }

  async update(
    id: number,
    updatePayload: UpdateMessageDto,
  ): Promise<Message | null> {
    try {
      const updated = await this.msgRepository.update(id, updatePayload);
      return updated;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: 'Task doesnt exist',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async remove(id: number) {
    await this.msgRepository.softDelete(id);
  }
  async validateChat(chatId: number, userId: User['id']) {
    const chat = await this.chatService.findOne(chatId, userId);
    if (!chat) {
      throw new BadRequestException(`Chat with id ${chatId} not found`);
    }
  }
}
