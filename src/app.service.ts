import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const data = process.env.MONGODB_URI;
    console.log(data);
    return 'Hello World!';
  }
}
