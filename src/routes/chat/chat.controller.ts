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
} from "@nestjs/common";

import { successResponse } from "src/auth/constants/response";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/routes/roles/roles.guard";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { QueryChatDto } from "./dto/query-chat.dto";
import { Chat } from "./domain/chat";
import { UpdateChatDto } from "./dto/update-chat.dto";
import { User as UserFromReq } from "src/shared/decorators/user.decorator";
import { User } from "../users/domain/user";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InfinityPaginationResultType } from "../../utils/types/infinity-pagination-result.type";
import { infinityPagination } from "../../utils/infinity-pagination";

@ApiTags("chat")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller({ path: "chat", version: "1" })
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createDto: CreateChatDto, @UserFromReq() user: User) {
    return this.chatService.create(createDto, user.id);
  }

  @Get()
  async findAll(
    @Query() query: QueryChatDto,
    @UserFromReq() user: User
  ): Promise<InfinityPaginationResultType<Chat>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
    try {
      const data = infinityPagination(
        await this.chatService.findAll({
          filterOptions: query?.filters ?? null,
          sortOptions: query?.sort ?? null,
          paginationOptions: {
            page,
            limit,
          },
          userId: user.id,
        }),
        { page, limit }
      );
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @UserFromReq() user: User) {
    return this.chatService.findOne(id, user.id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTasktDto: UpdateChatDto
  ) {
    return this.chatService.update(id, updateTasktDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.chatService.remove(id);
    return {
      ...successResponse,
    };
  }
}
