import { HomeService } from './home.service';
export declare class HomeController {
    private service;
    constructor(service: HomeService);
    appInfo(): {
        name: string | undefined;
    };
}
