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
exports.FilesLocalService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const file_repository_1 = require("../../persistence/file.repository");
let FilesLocalService = class FilesLocalService {
    constructor(configService, fileRepository) {
        this.configService = configService;
        this.fileRepository = fileRepository;
    }
    async create(file) {
        if (!file) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: 'selectFile',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return {
            file: await this.fileRepository.create({
                path: `/${this.configService.get('app.apiPrefix', {
                    infer: true,
                })}/v1/${file.path}`,
            }),
        };
    }
};
exports.FilesLocalService = FilesLocalService;
exports.FilesLocalService = FilesLocalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        file_repository_1.FileRepository])
], FilesLocalService);
//# sourceMappingURL=files.service.js.map