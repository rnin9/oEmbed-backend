import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using class Validator
  app.useGlobalPipes(new ValidationPipe());
  //cors setting
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
