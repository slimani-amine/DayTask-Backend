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
exports.CreateProjectDto = exports.IsUserConstraint = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let IsUserConstraint = class IsUserConstraint {
    validate(user) {
        return user && typeof user.id === "number";
    }
    defaultMessage() {
        return "Each member must be a user object with a numeric id";
    }
};
exports.IsUserConstraint = IsUserConstraint;
exports.IsUserConstraint = IsUserConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true })
], IsUserConstraint);
class CreateProjectDto {
}
exports.CreateProjectDto = CreateProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Project Title" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Project Description" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.Validate)(IsUserConstraint, { each: true }),
    __metadata("design:type", Object)
], CreateProjectDto.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-04-05T14:30:00Z" }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], CreateProjectDto.prototype, "due_date", void 0);
//# sourceMappingURL=create-project.dto.js.map