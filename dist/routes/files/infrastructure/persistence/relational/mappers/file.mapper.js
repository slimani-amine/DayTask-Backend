"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMapper = void 0;
const file_1 = require("../../../../domain/file");
const file_entity_1 = require("../entities/file.entity");
class FileMapper {
    static toDomain(raw) {
        const file = new file_1.FileType();
        file.id = raw.id;
        file.path = raw.path;
        return file;
    }
    static toPersistence(file) {
        const fileEntity = new file_entity_1.FileEntity();
        fileEntity.id = file.id;
        fileEntity.path = file.path;
        return fileEntity;
    }
}
exports.FileMapper = FileMapper;
//# sourceMappingURL=file.mapper.js.map