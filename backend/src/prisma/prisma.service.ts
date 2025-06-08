// backend/src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'; // Adicione OnModuleDestroy aqui
import { PrismaClient } from '@prisma/client';

@Injectable()
// Adicione OnModuleDestroy para um desligamento mais limpo
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy { 
  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService: Conectado ao banco de dados.');
  }

  // Novo método para desligamento: NestJS chamará automaticamente ao destruir o módulo
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService: Desconectado do banco de dados.');
  }

  // Este método é mais para configurar os hooks do NestJS.
  // A chamada this.$on('beforeExit', ...) não é o padrão e pode ser removida.
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
    // REMOVA OU COMENTE A LINHA ABAIXO QUE ESTAVA CAUSANDO O ERRO
    // this.$on('beforeExit', async () => { 
    //   await this.$disconnect();
    //   console.log('PrismaService: Desconectado do banco de dados.'); 
    // });
  }
}