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
exports.ValidateData = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("../../projects/projects.service");
const users_service_1 = require("../../users/users.service");
let ValidateData = class ValidateData {
    constructor(usersService, projectsService) {
        this.usersService = usersService;
        this.projectsService = projectsService;
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
    async validateProjectId(projectId) {
        const project = await this.projectsService.findOne(projectId);
        if (!project) {
            throw new common_1.BadRequestException(`Project with id ${projectId} not found`);
        }
    }
};
exports.ValidateData = ValidateData;
exports.ValidateData = ValidateData = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => projects_service_1.ProjectsService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        projects_service_1.ProjectsService])
], ValidateData);
//# sourceMappingURL=vlalidate-data.js.map