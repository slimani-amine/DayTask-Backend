import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType, SuccessResponseType } from './types/response.type';
import { NullableType } from '../utils/types/nullable.type';
import { User } from 'src/routes/users/domain/user';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
    register(createUserDto: AuthRegisterLoginDto): Promise<SuccessResponseType>;
    confirmEmail(confirmEmailDto: AuthConfirmEmailDto): Promise<SuccessResponseType>;
    forgotPassword(forgotPasswordDto: AuthForgotPasswordDto): Promise<SuccessResponseType>;
    resetPassword(resetPasswordDto: AuthResetPasswordDto): Promise<SuccessResponseType>;
    me(user: any): Promise<NullableType<User>>;
    refresh(user: any): Promise<Omit<LoginResponseType, 'user'>>;
    logout(user: any): Promise<SuccessResponseType>;
    update(user: any, userDto: AuthUpdateDto): Promise<NullableType<User>>;
    delete(user: any): Promise<SuccessResponseType>;
}
