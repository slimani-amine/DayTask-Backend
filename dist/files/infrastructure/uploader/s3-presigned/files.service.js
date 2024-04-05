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
exports.FilesS3PresignedService = void 0;
const common_1 = require("@nestjs/common");
const file_repository_1 = require("../../persistence/file.repository");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const config_1 = require("@nestjs/config");
let FilesS3PresignedService = class FilesS3PresignedService {
    constructor(fileRepository, configService) {
        this.fileRepository = fileRepository;
        this.configService = configService;
        this.s3 = new client_s3_1.S3Client({
            region: configService.get("file.awsS3Region", { infer: true }),
            credentials: {
                accessKeyId: configService.getOrThrow("file.accessKeyId", {
                    infer: true,
                }),
                secretAccessKey: configService.getOrThrow("file.secretAccessKey", {
                    infer: true,
                }),
            },
        });
    }
    async create(file) {
        if (!file) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: "selectFile",
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!file.fileName.match(/\.(jpg|jpeg|png|gif)$/i)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    file: `cantUploadFileType`,
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (file.fileSize >
            (this.configService.get("file.maxFileSize", {
                infer: true,
            }) || 0)) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PAYLOAD_TOO_LARGE,
                error: "Payload Too Large",
                message: "File too large",
            }, common_1.HttpStatus.PAYLOAD_TOO_LARGE);
        }
        const key = `${(0, random_string_generator_util_1.randomStringGenerator)()}.${file.fileName
            .split(".")
            .pop()
            ?.toLowerCase()}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.configService.getOrThrow("file.awsDefaultS3Bucket", {
                infer: true,
            }),
            Key: key,
            ContentLength: file.fileSize,
        });
        const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
        const data = await this.fileRepository.create({
            path: key,
        });
        return {
            file: data,
            uploadSignedUrl: signedUrl,
        };
    }
};
exports.FilesS3PresignedService = FilesS3PresignedService;
exports.FilesS3PresignedService = FilesS3PresignedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_repository_1.FileRepository,
        config_1.ConfigService])
], FilesS3PresignedService);
//# sourceMappingURL=files.service.js.map