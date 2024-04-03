import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { ChatRepository } from '../../chat.repository';
import { ChatEntity } from '../entities/chat.entity';
import { Chat } from 'src/routes/chat/domain/chat';
import { ChatMapper } from '../mappers/chat.mapper';
import { FilterChatDto, SortChatDto } from 'src/routes/chat/dto/query-chat.dto';

@Injectable()
export class ChatRelationalRepository implements ChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  async create(data: Chat): Promise<Chat> {
    const persistenceModel = ChatMapper.toPersistence(data);
    const newEntity = await this.chatRepository.save(
      this.chatRepository.create(persistenceModel),
    );
    return ChatMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterChatDto | null;
    sortOptions?: SortChatDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Chat[]> {
    const entities = await this.chatRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: filterOptions ?? {},
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((user) => ChatMapper.toDomain(user));
  }

  async findOne(fields: EntityCondition<Chat>): Promise<NullableType<Chat>> {
    const entity = await this.chatRepository.findOne({
      where: fields as FindOptionsWhere<ChatEntity>,
    });

    return entity ? ChatMapper.toDomain(entity) : null;
  }

  async update(id: Chat['id'], payload: Partial<Chat>): Promise<Chat> {
    const entity = await this.chatRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Task not found');
    }

    const updatedEntity = await this.chatRepository.save(
      this.chatRepository.create(
        ChatMapper.toPersistence({
          ...ChatMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChatMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Chat['id']): Promise<void> {
    await this.chatRepository.softDelete(id);
  }
}
