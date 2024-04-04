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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_email_login_dto_1 = require("./dto/auth-email-login.dto");
const auth_forgot_password_dto_1 = require("./dto/auth-forgot-password.dto");
const auth_confirm_email_dto_1 = require("./dto/auth-confirm-email.dto");
const auth_reset_password_dto_1 = require("./dto/auth-reset-password.dto");
const auth_update_dto_1 = require("./dto/auth-update.dto");
const passport_1 = require("@nestjs/passport");
const auth_register_login_dto_1 = require("./dto/auth-register-login.dto");
const response_1 = require("./constants/response");
const user_decorator_1 = require("../shared/decorators/user.decorator");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    login(loginDto) {
        return this.service.validateLogin(loginDto);
    }
    async register(createUserDto) {
        await this.service.register(createUserDto);
        return {
            ...response_1.successResponse,
        };
    }
    async confirmEmail(confirmEmailDto) {
        await this.service.confirmEmail(confirmEmailDto.hash);
        return {
            ...response_1.successResponse,
        };
    }
    async forgotPassword(forgotPasswordDto) {
        await this.service.forgotPassword(forgotPasswordDto.email);
        return {
            ...response_1.successResponse,
        };
    }
    async resetPassword(resetPasswordDto) {
        await this.service.resetPassword(resetPasswordDto.hash, resetPasswordDto.password);
        return {
            ...response_1.successResponse,
        };
    }
    me(user) {
        return this.service.me(user);
    }
    refresh(user) {
        return this.service.refreshToken({
            sessionId: user.sessionId,
            hash: user.hash,
        });
    }
    async logout(user) {
        await this.service.logout({
            sessionId: user.sessionId,
        });
        return {
            ...response_1.successResponse,
        };
    }
    update(user, userDto) {
        return this.service.update(user, userDto);
    }
    async delete(user) {
        await this.service.softDelete(user);
        return {
            ...response_1.successResponse,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ["me"],
    }),
    (0, common_1.Post)("email/login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_email_login_dto_1.AuthEmailLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("email/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_register_login_dto_1.AuthRegisterLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("email/confirm"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_confirm_email_dto_1.AuthConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, common_1.Post)("forgot/password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_forgot_password_dto_1.AuthForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)("reset/password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_reset_password_dto_1.AuthResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.SerializeOptions)({
        groups: ["me"],
    }),
    (0, common_1.Get)("me"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.SerializeOptions)({
        groups: ["me"],
    }),
    (0, common_1.Post)("refresh"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt-refresh")),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.SerializeOptions)({
        groups: ["me"],
    }),
    (0, common_1.Patch)("me"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_update_dto_1.AuthUpdateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)("me"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "delete", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)({
        path: "auth",
        version: "1",
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map