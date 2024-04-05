import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ChatRepository } from "./infastructure/persistence/chat.repository";
import { CreateChatDto } from "./dto/create-chat.dto";
import { FilterChatDto, SortChatDto } from "./dto/query-chat.dto";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { User } from "../users/domain/user";
import { ValidateData } from "../utils/validation/vlalidate-data";
import { Chat } from "./domain/chat";
import { IPaginationOptions } from "../utils/types/pagination-options";
import { NullableType } from "../utils/types/nullable.type";

@Injectable()
export class ChatService {
  constructor(
    private readonly validateData: ValidateData,
    private readonly chatRepository: ChatRepository
  ) {}

  async create(
    createPayload: CreateChatDto,
    ownerId: User["id"]
  ): Promise<Chat> {
    await Promise.all([
      this.validateData.vlaidateMembers(createPayload.members),
    ]);
    try {
      const created = await this.chatRepository.create({
        ...createPayload,
        members: [...createPayload.members, { id: ownerId }] as User[],
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
    filterOptions?: FilterChatDto | null;
    sortOptions?: SortChatDto[] | null;
    paginationOptions: IPaginationOptions;
    userId: User["id"];
  }): Promise<Chat[]> {
    return this.chatRepository.findManyWithPagination({
      filterOptions: { ...filterOptions, members: { id: userId as number } },
      sortOptions,
      paginationOptions,
    });
  }

  async findOne(id: number, userId: User["id"]): Promise<NullableType<Chat>> {
    const item = await this.chatRepository.findOne({ id: id });
    if (item) this.validateUserInCaht({ members: item.members, userId });
    return item;
  }

  async update(id: number, updatePayload: UpdateChatDto): Promise<Chat | null> {
    const validationPromises: Promise<void>[] = [];
    if (updatePayload.members) {
      validationPromises.push(
        this.validateData.vlaidateMembers(updatePayload.members)
      );
    }
    await Promise.all(validationPromises);
    try {
      const updated = await this.chatRepository.update(id, updatePayload);
      return updated;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            id: "Task doesnt exist",
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  async remove(id: number) {
    await this.chatRepository.softDelete(id);
  }
  validateUserInCaht({
    members,
    userId,
  }: {
    members: User[];
    userId: User["id"];
  }) {
    if (members?.some((member) => member.id == userId)) {
      return true;
    } else {
      throw new UnauthorizedException("You don't have access to this chat");
    }
  }
}
