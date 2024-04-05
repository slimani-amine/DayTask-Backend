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
exports.FileSchema = exports.FileSchemaClass = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const app_config_1 = __importDefault(require("../../../../../config/app.config"));
const file_config_type_1 = require("../../../../config/file-config.type");
const file_config_1 = __importDefault(require("../../../../config/file.config"));
const document_entity_helper_1 = require("../../../../../utils/document-entity-helper");
let FileSchemaClass = class FileSchemaClass extends document_entity_helper_1.EntityDocumentHelper {
};
exports.FileSchemaClass = FileSchemaClass;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if ((0, file_config_1.default)().driver === file_config_type_1.FileDriver.LOCAL) {
            return (0, app_config_1.default)().backendDomain + value;
        }
        else if ([file_config_type_1.FileDriver.S3_PRESIGNED, file_config_type_1.FileDriver.S3].includes((0, file_config_1.default)().driver)) {
            const s3 = new client_s3_1.S3Client({
                region: (0, file_config_1.default)().awsS3Region ?? "",
                credentials: {
                    accessKeyId: (0, file_config_1.default)().accessKeyId ?? "",
                    secretAccessKey: (0, file_config_1.default)().secretAccessKey ?? "",
                },
            });
            const command = new client_s3_1.GetObjectCommand({
                Bucket: (0, file_config_1.default)().awsDefaultS3Bucket ?? "",
                Key: value,
            });
            return (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 3600 });
        }
        return value;
    }, {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], FileSchemaClass.prototype, "path", void 0);
exports.FileSchemaClass = FileSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], FileSchemaClass);
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(FileSchemaClass);
//# sourceMappingURL=file.schema.js.map