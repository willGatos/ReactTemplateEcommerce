import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  getHello(): string {
    const data = process.env.MONGODB_URI;
    console.log(data);
    return this.appService.getHello();
  }
}
