import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { AllConfigType } from '../config/config.type';
export declare class AuthGoogleService {
    private configService;
    private google;
    constructor(configService: ConfigService<AllConfigType>);
    getProfileByToken(loginDto: AuthGoogleLoginDto): Promise<SocialInterface>;
}
