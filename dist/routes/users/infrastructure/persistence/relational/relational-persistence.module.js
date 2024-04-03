"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalUserPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user.repository");
const user_repository_2 = require("./repositories/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
let RelationalUserPersistenceModule = class RelationalUserPersistenceModule {
};
exports.RelationalUserPersistenceModule = RelationalUserPersistenceModule;
exports.RelationalUserPersistenceModule = RelationalUserPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity])],
        providers: [
            {
                provide: user_repository_1.UserRepository,
                useClass: user_repository_2.UsersRelationalRepository,
            },
        ],
        exports: [user_repository_1.UserRepository],
    })
], RelationalUserPersistenceModule);
//# sourceMappingURL=relational-persistence.module.js.map