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
exports.MessageRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
const message_mapper_1 = require("../mappers/message.mapper");
let MessageRelationalRepository = class MessageRelationalRepository {
    constructor(msgRepository) {
        this.msgRepository = msgRepository;
    }
    async create(data) {
        const persistenceModel = message_mapper_1.MessageMapper.toPersistence(data);
        const newEntity = await this.msgRepository.save(this.msgRepository.create(persistenceModel));
        return message_mapper_1.MessageMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const entities = await this.msgRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'user')
            .skip((paginationOptions.page - 1) * paginationOptions.limit)
            .take(paginationOptions.limit)
            .where(filterOptions ?? {})
            .orderBy(sortOptions?.reduce((accumulator, sort) => ({
            ...accumulator,
            [`message.${sort.orderBy}`]: sort.order,
        }), {}) ?? {})
            .getMany();
        return entities.map((user) => message_mapper_1.MessageMapper.toDomain(user));
    }
    async findOne(fields) {
        const entity = await this.msgRepository.findOne({
            where: fields,
        });
        return entity ? message_mapper_1.MessageMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.msgRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new common_1.BadRequestException('Message not found');
        }
        const updatedEntity = await this.msgRepository.save(this.msgRepository.create(message_mapper_1.MessageMapper.toPersistence({
            ...message_mapper_1.MessageMapper.toDomain(entity),
            ...payload,
        })));
        return message_mapper_1.MessageMapper.toDomain(updatedEntity);
    }
    async softDelete(id) {
        await this.msgRepository.softDelete(id);
    }
};
exports.MessageRelationalRepository = MessageRelationalRepository;
exports.MessageRelationalRepository = MessageRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.MessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageRelationalRepository);
//# sourceMappingURL=Message.repository.js.map