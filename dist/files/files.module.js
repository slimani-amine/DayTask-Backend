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
exports.FilesModule = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = __importDefault(require("../database/config/database.config"));
const document_persistence_module_1 = require("./infrastructure/persistence/document/document-persistence.module");
const relational_persistence_module_1 = require("./infrastructure/persistence/relational/relational-persistence.module");
const files_service_1 = require("./files.service");
const file_config_1 = __importDefault(require("./config/file.config"));
const file_config_type_1 = require("./config/file-config.type");
const files_module_1 = require("./infrastructure/uploader/local/files.module");
const files_module_2 = require("./infrastructure/uploader/s3/files.module");
const files_module_3 = require("./infrastructure/uploader/s3-presigned/files.module");
const infrastructurePersistenceModule = (0, database_config_1.default)()
    .isDocumentDatabase
    ? document_persistence_module_1.DocumentFilePersistenceModule
    : relational_persistence_module_1.RelationalFilePersistenceModule;
const infrastructureUploaderModule = (0, file_config_1.default)().driver === file_config_type_1.FileDriver.LOCAL
    ? files_module_1.FilesLocalModule
    : (0, file_config_1.default)().driver === file_config_type_1.FileDriver.S3
        ? files_module_2.FilesS3Module
        : files_module_3.FilesS3PresignedModule;
let FilesModule = class FilesModule {
};
exports.FilesModule = FilesModule;
exports.FilesModule = FilesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructurePersistenceModule, infrastructureUploaderModule],
        providers: [files_service_1.FilesService],
        exports: [files_service_1.FilesService, infrastructurePersistenceModule],
    })
], FilesModule);
//# sourceMappingURL=files.module.js.map