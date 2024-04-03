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
exports.FileDocumentRepository = void 0;
const common_1 = require("@nestjs/common");
const file_schema_1 = require("../entities/file.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_mapper_1 = require("../mappers/file.mapper");
let FileDocumentRepository = class FileDocumentRepository {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    async create(data) {
        const createdFile = new this.fileModel(data);
        const fileObject = await createdFile.save();
        return file_mapper_1.FileMapper.toDomain(fileObject);
    }
    async findOne(fields) {
        if (fields.id) {
            const fileObject = await this.fileModel.findById(fields.id);
            return fileObject ? file_mapper_1.FileMapper.toDomain(fileObject) : null;
        }
        const fileObject = await this.fileModel.findOne(fields);
        return fileObject ? file_mapper_1.FileMapper.toDomain(fileObject) : null;
    }
};
exports.FileDocumentRepository = FileDocumentRepository;
exports.FileDocumentRepository = FileDocumentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(file_schema_1.FileSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileDocumentRepository);
//# sourceMappingURL=file.repository.js.map