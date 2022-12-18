import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
