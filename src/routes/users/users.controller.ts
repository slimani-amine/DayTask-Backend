import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  BadRequestException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Roles } from "../roles/roles.decorator";
import { RoleEnum } from "../roles/roles.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/routes/roles/roles.guard";
import { infinityPagination } from "src/utils/infinity-pagination";
import { InfinityPaginationResultType } from "../../utils/types/infinity-pagination-result.type";
import { NullableType } from "../../utils/types/nullable.type";
import { QueryUserDto } from "./dto/query-user.dto";
import { User } from "./domain/user";
import { UsersService } from "./users.service";
import { SuccessResponseType } from "src/auth/types/response.type";
import { successResponse } from "src/auth/constants/response";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({
    groups: ["admin"],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createProfileDto);
  }

  @SerializeOptions({
    groups: ["admin"],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryUserDto
  ): Promise<InfinityPaginationResultType<User>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
    try {
      const data = infinityPagination(
        await this.usersService.findManyWithPagination({
          filterOptions: query?.filters,
          sortOptions: query?.sort,
          paginationOptions: {
            page,
            limit,
          },
        }),
        { page, limit }
      );
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @SerializeOptions({
    groups: ["admin"],
  })
  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: User["id"]): Promise<NullableType<User>> {
    return this.usersService.findOne({ id });
  }

  @SerializeOptions({
    groups: ["admin"],
  })
  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(
    @Param("id") id: User["id"],
    @Body() updateProfileDto: UpdateUserDto
  ): Promise<User | null> {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: User["id"]): Promise<SuccessResponseType> {
    await this.usersService.softDelete(id);
    return {
      ...successResponse,
    };
  }
}
