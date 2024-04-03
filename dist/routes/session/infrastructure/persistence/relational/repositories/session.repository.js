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
exports.SessionRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../entities/session.entity");
const session_mapper_1 = require("../mappers/session.mapper");
let SessionRelationalRepository = class SessionRelationalRepository {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async findOne(options) {
        const entity = await this.sessionRepository.findOne({
            where: options,
        });
        return entity ? session_mapper_1.SessionMapper.toDomain(entity) : null;
    }
    async create(data) {
        const persistenceModel = session_mapper_1.SessionMapper.toPersistence(data);
        return this.sessionRepository.save(this.sessionRepository.create(persistenceModel));
    }
    async update(id, payload) {
        const entity = await this.sessionRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new Error('Session not found');
        }
        const updatedEntity = await this.sessionRepository.save(this.sessionRepository.create(session_mapper_1.SessionMapper.toPersistence({
            ...session_mapper_1.SessionMapper.toDomain(entity),
            ...payload,
        })));
        return session_mapper_1.SessionMapper.toDomain(updatedEntity);
    }
    async softDelete({ excludeId, ...criteria }) {
        await this.sessionRepository.softDelete({
            ...criteria,
            id: criteria.id
                ? criteria.id
                : excludeId
                    ? (0, typeorm_2.Not)(excludeId)
                    : undefined,
        });
    }
};
exports.SessionRelationalRepository = SessionRelationalRepository;
exports.SessionRelationalRepository = SessionRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(session_entity_1.SessionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SessionRelationalRepository);
//# sourceMappingURL=session.repository.js.map