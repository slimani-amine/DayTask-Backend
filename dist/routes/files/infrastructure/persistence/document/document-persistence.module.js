"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFilePersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const file_schema_1 = require("./entities/file.schema");
const file_repository_1 = require("../file.repository");
const file_repository_2 = require("./repositories/file.repository");
let DocumentFilePersistenceModule = class DocumentFilePersistenceModule {
};
exports.DocumentFilePersistenceModule = DocumentFilePersistenceModule;
exports.DocumentFilePersistenceModule = DocumentFilePersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: file_schema_1.FileSchemaClass.name, schema: file_schema_1.FileSchema },
            ]),
        ],
        providers: [
            {
                provide: file_repository_1.FileRepository,
                useClass: file_repository_2.FileDocumentRepository,
            },
        ],
        exports: [file_repository_1.FileRepository],
    })
], DocumentFilePersistenceModule);
//# sourceMappingURL=document-persistence.module.js.map