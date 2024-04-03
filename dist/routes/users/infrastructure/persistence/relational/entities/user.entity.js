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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../../../../roles/infrastructure/persistence/relational/entities/role.entity");
const status_entity_1 = require("../../../../../../shared/statuses/infrastructure/persistence/relational/entities/status.entity");
const file_entity_1 = require("../../../../../files/infrastructure/persistence/relational/entities/file.entity");
const auth_providers_enum_1 = require("../../../../../../auth/auth-providers.enum");
const class_transformer_1 = require("class-transformer");
const general_entity_1 = require("../../../../../../shared/entities/general.entity");
let UserEntity = class UserEntity extends general_entity_1.GeneralEntity {
    loadPreviousPassword() {
        this.previousPassword = this.password;
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", Object)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "previousPassword", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "loadPreviousPassword", null);
__decorate([
    (0, typeorm_1.Column)({ default: auth_providers_enum_1.AuthProvidersEnum.email }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", String)
], UserEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me', 'admin'] }),
    __metadata("design:type", Object)
], UserEntity.prototype, "socialId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => file_entity_1.FileEntity, {
        eager: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, {
        eager: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.StatusEntity, {
        eager: true,
    }),
    __metadata("design:type", status_entity_1.StatusEntity)
], UserEntity.prototype, "status", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user',
    })
], UserEntity);
//# sourceMappingURL=user.entity.js.map