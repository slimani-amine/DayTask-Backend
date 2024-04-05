"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationalSessionPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const session_repository_1 = require("../session.repository");
const session_repository_2 = require("./repositories/session.repository");
const typeorm_1 = require("@nestjs/typeorm");
const session_entity_1 = require("./entities/session.entity");
let RelationalSessionPersistenceModule = class RelationalSessionPersistenceModule {
};
exports.RelationalSessionPersistenceModule = RelationalSessionPersistenceModule;
exports.RelationalSessionPersistenceModule = RelationalSessionPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([session_entity_1.SessionEntity])],
        providers: [
            {
                provide: session_repository_1.SessionRepository,
                useClass: session_repository_2.SessionRelationalRepository,
            },
        ],
        exports: [session_repository_1.SessionRepository],
    })
], RelationalSessionPersistenceModule);
//# sourceMappingURL=relational-persistence.module.js.map