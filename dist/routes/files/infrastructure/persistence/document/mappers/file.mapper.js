"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMapper = void 0;
const file_1 = require("../../../../domain/file");
const file_schema_1 = require("../entities/file.schema");
class FileMapper {
    static toDomain(raw) {
        const file = new file_1.FileType();
        file.id = raw._id.toString();
        file.path = raw.path;
        return file;
    }
    static toPersistence(file) {
        const fileEntity = new file_schema_1.FileSchemaClass();
        if (file.id) {
            fileEntity._id = file.id;
        }
        fileEntity.path = file.path;
        return fileEntity;
    }
}
exports.FileMapper = FileMapper;
//# sourceMappingURL=file.mapper.js.map