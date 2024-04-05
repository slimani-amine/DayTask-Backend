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
exports.ChatRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("../entities/chat.entity");
const chat_mapper_1 = require("../mappers/chat.mapper");
let ChatRelationalRepository = class ChatRelationalRepository {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async create(data) {
        const persistenceModel = chat_mapper_1.ChatMapper.toPersistence(data);
        const newEntity = await this.chatRepository.save(this.chatRepository.create(persistenceModel));
        return chat_mapper_1.ChatMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const entities = await this.chatRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
            where: filterOptions ?? {},
            order: sortOptions?.reduce((accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }), {}),
        });
        return entities.map((user) => chat_mapper_1.ChatMapper.toDomain(user));
    }
    async findOne(fields) {
        const entity = await this.chatRepository.findOne({
            where: fields,
        });
        return entity ? chat_mapper_1.ChatMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.chatRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new Error("Task not found");
        }
        const updatedEntity = await this.chatRepository.save(this.chatRepository.create(chat_mapper_1.ChatMapper.toPersistence({
            ...chat_mapper_1.ChatMapper.toDomain(entity),
            ...payload,
        })));
        return chat_mapper_1.ChatMapper.toDomain(updatedEntity);
    }
    async softDelete(id) {
        await this.chatRepository.softDelete(id);
    }
};
exports.ChatRelationalRepository = ChatRelationalRepository;
exports.ChatRelationalRepository = ChatRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.ChatEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatRelationalRepository);
//# sourceMappingURL=chat.repository.js.map