// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();
  // Adiciona um atraso de alguns segundos (ex: 5 segundos)
  await new Promise(resolve => setTimeout(resolve, 5000));
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
    },
  });
  await app.listen(3000);
}
void bootstrap();