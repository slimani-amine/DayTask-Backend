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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_1 = require("./infastructure/persistence/projects.repository");
const users_service_1 = require("../users/users.service");
let ProjectsService = class ProjectsService {
    constructor(usersService, projectRepository) {
        this.usersService = usersService;
        this.projectRepository = projectRepository;
    }
    async vlaidateMembers(members) {
        const userIds = members.map((e) => e.id);
        if (new Set(userIds).size !== userIds.length) {
            throw new common_1.BadRequestException("Members must be unique");
        }
        const usersPromises = members.map((e) => this.usersService.findOne({
            id: e.id,
        }));
        const users = await Promise.all(usersPromises);
        if (users.includes(null)) {
            throw new common_1.BadRequestException(`User with id ${members[users.indexOf(null)].id} not found`);
        }
    }
    async create(createProject) {
        await this.vlaidateMembers(createProject.members);
        try {
            const created = await this.projectRepository.create(createProject);
            return created;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, }) {
        return this.projectRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }
    async findOne(id) {
        const item = await this.projectRepository.findOne({ id: id });
        return item;
    }
    async update(id, updateProject) {
        if (updateProject.members) {
            await this.vlaidateMembers(updateProject.members);
        }
        try {
            const updated = await this.projectRepository.update(id, updateProject);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    id: "Project doesnt exist",
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async remove(id) {
        await this.projectRepository.softDelete(id);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        projects_repository_1.ProjectRepository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map