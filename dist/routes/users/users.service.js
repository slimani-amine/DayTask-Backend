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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./infrastructure/persistence/user.repository");
const statuses_enum_1 = require("../../shared/statuses/statuses.enum");
const roles_enum_1 = require("../roles/roles.enum");
const files_service_1 = require("../files/files.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = require("validator");
let UsersService = class UsersService {
    constructor(usersRepository, filesService) {
        this.usersRepository = usersRepository;
        this.filesService = filesService;
    }
    async create(createProfileDto) {
        const clonedPayload = {
            ...createProfileDto,
        };
        if (clonedPayload.password) {
            const salt = await bcryptjs_1.default.genSalt();
            clonedPayload.password = await bcryptjs_1.default.hash(clonedPayload.password, salt);
        }
        if (clonedPayload.email) {
            const userObject = await this.usersRepository.findOne({
                email: clonedPayload.email,
            });
            if (userObject) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'Email already exists',
                    },
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        if (clonedPayload.photo?.id) {
            const fileObject = await this.getFileObject(clonedPayload.photo?.id);
            clonedPayload.photo = fileObject;
        }
        this.vlaidteRole(clonedPayload.role);
        this.validateStatus(clonedPayload.status);
        return this.usersRepository.create(clonedPayload);
    }
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        return this.usersRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }
    findOne(fields) {
        return this.usersRepository.findOne(fields);
    }
    async update(id, payload) {
        const clonedPayload = { ...payload };
        if (clonedPayload.password &&
            clonedPayload.previousPassword !== clonedPayload.password) {
            const salt = await bcryptjs_1.default.genSalt();
            clonedPayload.password = await bcryptjs_1.default.hash(clonedPayload.password, salt);
        }
        if (clonedPayload.email) {
            const userObject = await this.usersRepository.findOne({
                email: clonedPayload.email,
            });
            if (userObject && userObject?.id !== id) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'Email already exists',
                    },
                }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        if (clonedPayload.photo?.id) {
            const fileObject = await this.getFileObject(clonedPayload.photo?.id);
            clonedPayload.photo = fileObject;
        }
        if (clonedPayload.role)
            this.vlaidteRole(clonedPayload.role);
        if (clonedPayload.status)
            this.validateStatus(clonedPayload.status);
        try {
            const updated = await this.usersRepository.update(id, clonedPayload);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'User doesnt exist',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async softDelete(id) {
        await this.usersRepository.softDelete(id);
    }
    async getFileObject(photoId) {
        if (!(0, validator_1.isUUID)(photoId)) {
            throw new common_1.BadRequestException('Invalid UUID for photo id');
        }
        const fileObject = await this.filesService.findOne({
            id: photoId,
        });
        if (!fileObject) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    photo: 'Image doesnt exist',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return fileObject;
    }
    vlaidteRole(role) {
        if (!role?.id || !Object.values(roles_enum_1.RoleEnum).includes(role?.id)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    role: 'Role doesnt exist',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    validateStatus(status) {
        if (!status?.id || !Object.values(statuses_enum_1.StatusEnum).includes(status?.id)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    status: 'Status doesnt exist',
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async validateUser(userId) {
        const user = await this.usersRepository.findOne({ id: userId });
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${userId} not found`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        files_service_1.FilesService])
], UsersService);
//# sourceMappingURL=users.service.js.map