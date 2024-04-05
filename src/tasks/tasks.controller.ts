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
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { QueryTaskDto } from "./dto/query-task.dto";
import { Task } from "./domain/task";
import { successResponse } from "src/auth/constants/response";
import { TasksService } from "./tasks.service";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/roles/roles.guard";
import { InfinityPaginationResultType } from "../utils/types/infinity-pagination-result.type";
import { infinityPagination } from "../utils/infinity-pagination";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("tasks")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller({ path: "tasks", version: "1" })
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll(
    @Query() query: QueryTaskDto
  ): Promise<InfinityPaginationResultType<Task>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ? (query?.limit > 50 ? 50 : query?.limit) : 10;
    try {
      const data = infinityPagination(
        await this.tasksService.findAll({
          filterOptions: query?.filters ?? null,
          sortOptions: query?.sort ?? null,
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

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTasktDto: UpdateTaskDto
  ) {
    return this.tasksService.update(id, updateTasktDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.tasksService.remove(id);
    return {
      ...successResponse,
    };
  }
}
