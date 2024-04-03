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
exports.FilesS3PresignedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const files_service_1 = require("./files.service");
const file_dto_1 = require("./dto/file.dto");
let FilesS3PresignedController = class FilesS3PresignedController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    async uploadFile(file) {
        return this.filesService.create(file);
    }
};
exports.FilesS3PresignedController = FilesS3PresignedController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.FileUploadDto]),
    __metadata("design:returntype", Promise)
], FilesS3PresignedController.prototype, "uploadFile", null);
exports.FilesS3PresignedController = FilesS3PresignedController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)({
        path: 'files',
        version: '1',
    }),
    __metadata("design:paramtypes", [files_service_1.FilesS3PresignedService])
], FilesS3PresignedController);
//# sourceMappingURL=files.controller.js.map