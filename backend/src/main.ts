// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common'; // Importe o ValidationPipe

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
    },
  });

  // Adicione o ValidationPipe globalmente para que as validações dos DTOs funcionem
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Lança erro se houver propriedades não whitelistadas
    transform: true, // Transforma o payload em uma instância do DTO
  }));

  await app.listen(3000); // Ou 4000, dependendo do que você configurou
}
void bootstrap();