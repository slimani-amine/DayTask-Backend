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
exports.User = void 0;
const class_transformer_1 = require("class-transformer");
const general_domain_1 = require("../../shared/domain/general.domain");
class User extends general_domain_1.GeneralDomain {
}
exports.User = User;
__decorate([
    (0, class_transformer_1.Expose)({ groups: ["me", "admin"] }),
    __metadata("design:type", Object)
], User.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], User.prototype, "previousPassword", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ groups: ["me", "admin"] }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ groups: ["me", "admin"] }),
    __metadata("design:type", Object)
], User.prototype, "socialId", void 0);
//# sourceMappingURL=user.js.map