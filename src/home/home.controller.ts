import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller({
  path: 'info',
  version: '1',
})
export class HomeController {
  constructor(private service: HomeService) {}

  @Get()
  appInfo() {
    return this.service.appInfo();
  }
}
