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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const file_config_1 = __importDefault(require("../config/file.config"));
const file_config_type_1 = require("../config/file-config.type");
const app_config_1 = __importDefault(require("../../config/app.config"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const typeorm_1 = require("typeorm");
const general_domain_1 = require("../../shared/domain/general.domain");
class FileType extends general_domain_1.GeneralDomain {
}
exports.FileType = FileType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' }),
    (0, class_validator_1.Allow)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FileType.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if ((0, file_config_1.default)().driver === file_config_type_1.FileDriver.LOCAL) {
            return (0, app_config_1.default)().backendDomain + value;
        }
        else if ([file_config_type_1.FileDriver.S3_PRESIGNED, file_config_type_1.FileDriver.S3].includes((0, file_config_1.default)().driver)) {
            const s3 = new client_s3_1.S3Client({
                region: (0, file_config_1.default)().awsS3Region ?? '',
                credentials: {
                    accessKeyId: (0, file_config_1.default)().accessKeyId ?? '',
                    secretAccessKey: (0, file_config_1.default)().secretAccessKey ?? '',
                },
            });
            const command = new client_s3_1.GetObjectCommand({
                Bucket: (0, file_config_1.default)().awsDefaultS3Bucket ?? '',
                Key: value,
            });
            return (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
        }
        return value;
    }, {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], FileType.prototype, "path", void 0);
//# sourceMappingURL=file.js.map