"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesS3Module = void 0;
const common_1 = require("@nestjs/common");
const files_controller_1 = require("./files.controller");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_s3_1 = __importDefault(require("multer-s3"));
const files_service_1 = require("./files.service");
const database_config_1 = __importDefault(require("../../../../database/config/database.config"));
const document_persistence_module_1 = require("../../persistence/document/document-persistence.module");
const relational_persistence_module_1 = require("../../persistence/relational/relational-persistence.module");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? document_persistence_module_1.DocumentFilePersistenceModule
    : relational_persistence_module_1.RelationalFilePersistenceModule;
let FilesS3Module = class FilesS3Module {
};
exports.FilesS3Module = FilesS3Module;
exports.FilesS3Module = FilesS3Module = __decorate([
    (0, common_1.Module)({
        imports: [
            infrastructurePersistenceModule,
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const s3 = new client_s3_1.S3Client({
                        region: configService.get('file.awsS3Region', { infer: true }),
                        credentials: {
                            accessKeyId: configService.getOrThrow('file.accessKeyId', {
                                infer: true,
                            }),
                            secretAccessKey: configService.getOrThrow('file.secretAccessKey', {
                                infer: true,
                            }),
                        },
                    });
                    return {
                        fileFilter: (request, file, callback) => {
                            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                                return callback(new common_1.HttpException({
                                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                                    errors: {
                                        file: `cantUploadFileType`,
                                    },
                                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY), false);
                            }
                            callback(null, true);
                        },
                        storage: (0, multer_s3_1.default)({
                            s3: s3,
                            bucket: configService.getOrThrow('file.awsDefaultS3Bucket', {
                                infer: true,
                            }),
                            contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
                            key: (request, file, callback) => {
                                callback(null, `${(0, random_string_generator_util_1.randomStringGenerator)()}.${file.originalname
                                    .split('.')
                                    .pop()
                                    ?.toLowerCase()}`);
                            },
                        }),
                        limits: {
                            fileSize: configService.get('file.maxFileSize', { infer: true }),
                        },
                    };
                },
            }),
        ],
        controllers: [files_controller_1.FilesS3Controller],
        providers: [files_service_1.FilesS3Service],
        exports: [files_service_1.FilesS3Service],
    })
], FilesS3Module);
//# sourceMappingURL=files.module.js.map