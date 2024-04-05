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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_repository_1 = require("./infastructure/persistence/chat.repository");
const vlalidate_data_1 = require("../utils/validation/vlalidate-data");
let ChatService = class ChatService {
    constructor(validateData, chatRepository) {
        this.validateData = validateData;
        this.chatRepository = chatRepository;
    }
    async create(createPayload, ownerId) {
        await Promise.all([
            this.validateData.vlaidateMembers(createPayload.members),
        ]);
        try {
            const created = await this.chatRepository.create({
                ...createPayload,
                members: [...createPayload.members, { id: ownerId }],
            });
            return created;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async findAll({ filterOptions, sortOptions, paginationOptions, userId, }) {
        return this.chatRepository.findManyWithPagination({
            filterOptions: { ...filterOptions, members: { id: userId } },
            sortOptions,
            paginationOptions,
        });
    }
    async findOne(id, userId) {
        const item = await this.chatRepository.findOne({ id: id });
        if (item)
            this.validateUserInCaht({ members: item.members, userId });
        return item;
    }
    async update(id, updatePayload) {
        const validationPromises = [];
        if (updatePayload.members) {
            validationPromises.push(this.validateData.vlaidateMembers(updatePayload.members));
        }
        await Promise.all(validationPromises);
        try {
            const updated = await this.chatRepository.update(id, updatePayload);
            return updated;
        }
        catch (err) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    id: "Task doesnt exist",
                },
            }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async remove(id) {
        await this.chatRepository.softDelete(id);
    }
    validateUserInCaht({ members, userId, }) {
        if (members?.some((member) => member.id == userId)) {
            return true;
        }
        else {
            throw new common_1.UnauthorizedException("You don't have access to this chat");
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vlalidate_data_1.ValidateData,
        chat_repository_1.ChatRepository])
], ChatService);
//# sourceMappingURL=chat.service.js.map