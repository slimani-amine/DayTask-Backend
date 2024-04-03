import { AuthService } from '../auth/auth.service';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { LoginResponseType } from '../auth/types/response.type';
export declare class AuthGoogleController {
    private readonly authService;
    private readonly authGoogleService;
    constructor(authService: AuthService, authGoogleService: AuthGoogleService);
    login(loginDto: AuthGoogleLoginDto): Promise<LoginResponseType>;
}
