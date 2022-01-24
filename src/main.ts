import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using class Validator
  app.useGlobalPipes(new ValidationPipe());
  //cors setting
  app.enableCors();
  app.use('/public', express.static(join(__dirname, '../public')));
  await app.listen(3001);
}
bootstrap();
