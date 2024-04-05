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
exports.ProjectRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
const project_mapper_1 = require("../mappers/project.mapper");
let ProjectRelationalRepository = class ProjectRelationalRepository {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async create(data) {
        const persistenceModel = project_mapper_1.ProjectMapper.toPersistence(data);
        const newEntity = await this.projectsRepository.save(this.projectsRepository.create(persistenceModel));
        return project_mapper_1.ProjectMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const entities = await this.projectsRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
            where: filterOptions ?? {},
            order: sortOptions?.reduce((accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }), {}),
        });
        return entities.map((user) => project_mapper_1.ProjectMapper.toDomain(user));
    }
    async findOne(fields) {
        const entity = await this.projectsRepository.findOne({
            where: fields,
        });
        return entity ? project_mapper_1.ProjectMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.projectsRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new Error("Project not found");
        }
        const updatedEntity = await this.projectsRepository.save(this.projectsRepository.create(project_mapper_1.ProjectMapper.toPersistence({
            ...project_mapper_1.ProjectMapper.toDomain(entity),
            ...payload,
        })));
        return project_mapper_1.ProjectMapper.toDomain(updatedEntity);
    }
    async softDelete(id) {
        await this.projectsRepository.softDelete(id);
    }
};
exports.ProjectRelationalRepository = ProjectRelationalRepository;
exports.ProjectRelationalRepository = ProjectRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectRelationalRepository);
//# sourceMappingURL=projects.repository.js.map