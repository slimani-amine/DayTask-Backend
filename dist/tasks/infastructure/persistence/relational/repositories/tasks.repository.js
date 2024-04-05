"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const task_mapper_1 = require("../mappers/task.mapper");
let TaskRelationalRepository = class TaskRelationalRepository {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(data) {
        const persistenceModel = task_mapper_1.TaskMapper.toPersistence(data);
        const newEntity = await this.tasksRepository.save(this.tasksRepository.create(persistenceModel));
        return task_mapper_1.TaskMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const entities = await this.tasksRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
            where: filterOptions ?? {},
            order: sortOptions?.reduce((accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }), {}),
        });
        return entities.map((user) => task_mapper_1.TaskMapper.toDomain(user));
    }
    async findOne(fields) {
        const entity = await this.tasksRepository.findOne({
            where: fields,
        });
        return entity ? task_mapper_1.TaskMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.tasksRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new common_1.BadRequestException("Task not found");
        }
        const updatedEntity = await this.tasksRepository.save(this.tasksRepository.create(task_mapper_1.TaskMapper.toPersistence({
            ...task_mapper_1.TaskMapper.toDomain(entity),
            ...payload,
        })));
        return task_mapper_1.TaskMapper.toDomain(updatedEntity);
    }
    async softDelete(id) {
        await this.tasksRepository.softDelete(id);
    }
};
exports.TaskRelationalRepository = TaskRelationalRepository;
exports.TaskRelationalRepository = TaskRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskRelationalRepository);
//# sourceMappingURL=tasks.repository.js.map