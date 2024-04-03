import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { MessageRepository } from '../../Message.repository';
import { MessageEntity } from '../entities/message.entity';
import {
  FilterMessageDto,
  SortMessageDto,
} from 'src/routes/messages/dto/query-message.dto';
import { Message } from 'src/routes/messages/domain/message';
import { MessageMapper } from '../mappers/message.mapper';

@Injectable()
export class MessageRelationalRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly msgRepository: Repository<MessageEntity>,
  ) {}

  async create(data: Message): Promise<Message> {
    const persistenceModel = MessageMapper.toPersistence(data);
    const newEntity = await this.msgRepository.save(
      this.msgRepository.create(persistenceModel),
    );
    return MessageMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterMessageDto | null;
    sortOptions?: SortMessageDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Message[]> {
    const entities = await this.msgRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'user')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit)
      .where(filterOptions ?? {})
      .orderBy(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [`message.${sort.orderBy}`]: sort.order,
          }),
          {},
        ) ?? {},
      )
      .getMany();
    return entities.map((user) => MessageMapper.toDomain(user));
  }

  async findOne(
    fields: EntityCondition<Message>,
  ): Promise<NullableType<Message>> {
    const entity = await this.msgRepository.findOne({
      where: fields as FindOptionsWhere<MessageEntity>,
    });

    return entity ? MessageMapper.toDomain(entity) : null;
  }

  async update(id: Message['id'], payload: Partial<Message>): Promise<Message> {
    const entity = await this.msgRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new BadRequestException('Message not found');
    }

    const updatedEntity = await this.msgRepository.save(
      this.msgRepository.create(
        MessageMapper.toPersistence({
          ...MessageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MessageMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Message['id']): Promise<void> {
    await this.msgRepository.softDelete(id);
  }
}
