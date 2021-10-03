import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoIdValidationPipe } from './common/pipes/validate-mongo-id.pipe';
import dotenv from 'dotenv'

// console.log(dotenv)

// console.log(process.env.PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
    new MongoIdValidationPipe(),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
