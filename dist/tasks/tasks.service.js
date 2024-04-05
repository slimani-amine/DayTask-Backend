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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_repository_1 = require("./infastructure/persistence/tasks.repository");
const projects_service_1 = require("../projects/projects.service");
const vlalidate_data_1 = require("../utils/validation/vlalidate-data");
let TasksService = class TasksService {
    constructor(validateData, taskRepository, projectService) {
        this.validateData = validateData;
        this.taskRepository = taskRepository;
        this.projectService = projectService;
    }
    async create(createPayload) {
        const { projectId, ...rest } = createPayload;
        await Promise.all([
            this.validateData.vlaidateMembers(createPayload.members),
            this.validateData.validateProjectId(projectId),
        ]);
        try {
            const created = await this.taskRepository.create({
                ...rest,
                project: { id: projectId },
            });
            return created;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, }) {
        return this.taskRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }
    async findOne(id) {
        const item = await this.taskRepository.findOne({ id: id });
        return item;
    }
    async update(id, updatePayload) {
        const validationPromises = [];
        if (updatePayload.projectId) {
            validationPromises.push(this.validateData.validateProjectId(updatePayload.projectId));
        }
        if (updatePayload.members) {
            validationPromises.push(this.validateData.vlaidateMembers(updatePayload.members));
            validationPromises.push(this.validteMembersInProject({
                members: updatePayload.members,
                projectId: updatePayload.projectId,
                taskId: id,
            }));
        }
        await Promise.all(validationPromises);
        try {
            const updated = await this.taskRepository.update(id, updatePayload);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    id: "Task doesnt exist",
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async remove(id) {
        await this.taskRepository.softDelete(id);
    }
    async validteMembersInProject({ members, projectId, taskId, }) {
        const userIds = members.map((e) => e.id);
        let task = null;
        if (!projectId) {
            task = await this.taskRepository.findOne({ id: taskId });
        }
        if (task === null && !projectId) {
            throw new common_1.BadRequestException(`Task with id ${taskId} not found`);
        }
        const project = await this.projectService.findOne(projectId ?? task.project.id);
        const projectMembersIds = project?.members.map((e) => e.id);
        userIds?.forEach((e) => {
            if (!projectMembersIds?.includes(e)) {
                throw new common_1.BadRequestException(`User with id ${e} not a project member`);
            }
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vlalidate_data_1.ValidateData,
        tasks_repository_1.TaskRepository,
        projects_service_1.ProjectsService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map