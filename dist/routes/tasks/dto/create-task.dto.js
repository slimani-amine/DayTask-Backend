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
exports.CreateTaskDto = void 0;
const class_validator_1 = require("class-validator");
const create_project_dto_1 = require("../../projects/dto/create-project.dto");
const class_transformer_1 = require("class-transformer");
const project_1 = require("../../projects/domain/project");
const swagger_1 = require("@nestjs/swagger");
class CreateTaskDto {
    constructor() {
        this.description = null;
        this.due_date = null;
        this.completed = false;
        this.completedAt = null;
        this.startedAt = null;
    }
}
exports.CreateTaskDto = CreateTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Task title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Task description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "projectId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", project_1.Project)
], CreateTaskDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-05T14:30:00Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.Validate)(create_project_dto_1.IsUserConstraint, { each: true }),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-05T14:30:00Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-05T14:30:00Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateTaskDto.prototype, "startedAt", void 0);
//# sourceMappingURL=create-task.dto.js.map