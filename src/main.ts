import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins = process.env.CORS_ORIGINS?.split(';')
  const corsOptions = corsOrigins
  ? {
      origin: corsOrigins,
      credentials: true,
    }
  : {}

  app.use(cookieParser());
  app.enableCors(corsOptions)

  await app.listen(3000);
}
bootstrap();
