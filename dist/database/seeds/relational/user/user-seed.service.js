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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const statuses_enum_1 = require("../../../../statuses/statuses.enum");
const user_entity_1 = require("../../../../routes/users/infrastructure/persistence/relational/entities/user.entity");
const roles_enum_1 = require("../../../../routes/roles/roles.enum");
let UserSeedService = class UserSeedService {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        const countAdmin = await this.repository.count({
            where: {
                role: {
                    id: roles_enum_1.RoleEnum.admin,
                },
            },
        });
        if (!countAdmin) {
            const salt = await bcryptjs_1.default.genSalt();
            const password = await bcryptjs_1.default.hash('secret', salt);
            await this.repository.save(this.repository.create({
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@example.com',
                password,
                role: {
                    id: roles_enum_1.RoleEnum.admin,
                    name: 'Admin',
                },
                status: {
                    id: statuses_enum_1.StatusEnum.active,
                    name: 'Active',
                },
            }));
        }
        const countUser = await this.repository.count({
            where: {
                role: {
                    id: roles_enum_1.RoleEnum.user,
                },
            },
        });
        if (!countUser) {
            const salt = await bcryptjs_1.default.genSalt();
            const password = await bcryptjs_1.default.hash('secret', salt);
            await this.repository.save(this.repository.create({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password,
                role: {
                    id: roles_enum_1.RoleEnum.user,
                    name: 'Admin',
                },
                status: {
                    id: statuses_enum_1.StatusEnum.active,
                    name: 'Active',
                },
            }));
        }
    }
};
exports.UserSeedService = UserSeedService;
exports.UserSeedService = UserSeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSeedService);
//# sourceMappingURL=user-seed.service.js.map