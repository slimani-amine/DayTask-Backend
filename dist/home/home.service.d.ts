import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
export declare class HomeService {
    private configService;
    constructor(configService: ConfigService<AllConfigType>);
    appInfo(): {
        name: string | undefined;
    };
}
