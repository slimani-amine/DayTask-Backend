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
const config_1 = require("@nestjs/config");
const file_config_type_1 = require("./file-config.type");
const class_validator_1 = require("class-validator");
const validate_config_1 = __importDefault(require("../../../utils/validate-config"));
class EnvironmentVariablesValidator {
}
__decorate([
    (0, class_validator_1.IsEnum)(file_config_type_1.FileDriver),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "FILE_DRIVER", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => [file_config_type_1.FileDriver.S3, file_config_type_1.FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "ACCESS_KEY_ID", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => [file_config_type_1.FileDriver.S3, file_config_type_1.FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "SECRET_ACCESS_KEY", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => [file_config_type_1.FileDriver.S3, file_config_type_1.FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "AWS_DEFAULT_S3_BUCKET", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => [file_config_type_1.FileDriver.S3, file_config_type_1.FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "AWS_DEFAULT_S3_URL", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((envValues) => [file_config_type_1.FileDriver.S3, file_config_type_1.FileDriver.S3_PRESIGNED].includes(envValues.FILE_DRIVER)),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "AWS_S3_REGION", void 0);
exports.default = (0, config_1.registerAs)('file', () => {
    (0, validate_config_1.default)(process.env, EnvironmentVariablesValidator);
    return {
        driver: process.env.FILE_DRIVER ?? file_config_type_1.FileDriver.LOCAL,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
        awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
        awsS3Region: process.env.AWS_S3_REGION,
        maxFileSize: 5242880,
    };
});
//# sourceMappingURL=file.config.js.map