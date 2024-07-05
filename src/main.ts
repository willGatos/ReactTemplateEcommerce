import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.use(cors());

  app.enableCors(corsOptions);
  app.useStaticAssets('uploads', {
    prefix: '/uploads', // You can adjust the prefix as needed
  });
  await app.listen(3000);
}



bootstrap();
