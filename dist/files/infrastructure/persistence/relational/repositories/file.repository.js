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
exports.FileRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("../entities/file.entity");
const typeorm_2 = require("typeorm");
const file_mapper_1 = require("../mappers/file.mapper");
let FileRelationalRepository = class FileRelationalRepository {
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async create(data) {
        const persistenceModel = file_mapper_1.FileMapper.toPersistence(data);
        return this.fileRepository.save(this.fileRepository.create(persistenceModel));
    }
    async findOne(fields) {
        const entity = await this.fileRepository.findOne({
            where: fields,
        });
        return entity ? file_mapper_1.FileMapper.toDomain(entity) : null;
    }
};
exports.FileRelationalRepository = FileRelationalRepository;
exports.FileRelationalRepository = FileRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileRelationalRepository);
//# sourceMappingURL=file.repository.js.map