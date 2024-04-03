"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
const create_project_dto_1 = require("./create-project.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateProjectDto extends (0, swagger_1.PartialType)(create_project_dto_1.CreateProjectDto) {
}
exports.UpdateProjectDto = UpdateProjectDto;
//# sourceMappingURL=update-project.dto.js.map