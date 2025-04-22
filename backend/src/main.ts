import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3001', // Permita apenas seu frontend
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Se você precisar de cookies em cross-origin
      allowedHeaders: 'Content-Type, Authorization', // Permita o cabeçalho Authorization
    },
  });
  await app.listen(3000);
}
void bootstrap();
