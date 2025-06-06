import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  config(); // Carrega as variáveis de ambiente do .env

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001', // A URL do seu frontend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // <-- ADICIONADO 'OPTIONS' AQUI
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

  await app.listen(3000); // Certifique-se de que esta é a porta que seu backend está ouvindo
}
void bootstrap();