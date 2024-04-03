import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseType, SuccessResponseType } from './types/response.type';
import { NullableType } from '../utils/types/nullable.type';
import { successResponse } from './constants/response';
import { User as ReqUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/routes/users/domain/user';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public login(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseType> {
    return this.service.validateLogin(loginDto);
  }

  @Post('email/register')
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<SuccessResponseType> {
    await this.service.register(createUserDto);
    return {
      ...successResponse,
    };
  }

  @Post('email/confirm')
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<SuccessResponseType> {
    await this.service.confirmEmail(confirmEmailDto.hash);
    return {
      ...successResponse,
    };
  }

  @Post('forgot/password')
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<SuccessResponseType> {
    await this.service.forgotPassword(forgotPasswordDto.email);
    return {
      ...successResponse,
    };
  }

  @Post('reset/password')
  async resetPassword(
    @Body() resetPasswordDto: AuthResetPasswordDto,
  ): Promise<SuccessResponseType> {
    await this.service.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    );
    return {
      ...successResponse,
    };
  }

  //@ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@ReqUser() user): Promise<NullableType<User>> {
    return this.service.me(user);
  }

  //@ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@ReqUser() user): Promise<Omit<LoginResponseType, 'user'>> {
    return this.service.refreshToken({
      sessionId: user.sessionId,
      hash: user.hash,
    });
  }

  //@ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  public async logout(@ReqUser() user): Promise<SuccessResponseType> {
    await this.service.logout({
      sessionId: user.sessionId,
    });
    return {
      ...successResponse,
    };
  }

  //@ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public update(
    @ReqUser() user,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.service.update(user, userDto);
  }

  //@ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@ReqUser() user): Promise<SuccessResponseType> {
    await this.service.softDelete(user);
    return {
      ...successResponse,
    };
  }
}
