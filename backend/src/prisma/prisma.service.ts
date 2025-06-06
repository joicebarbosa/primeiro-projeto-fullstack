// backend/src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Este método é chamado quando o módulo é inicializado.
    // Ele garante que o PrismaClient se conecte ao banco de dados.
    await this.$connect();
    console.log('PrismaService: Conectado ao banco de dados.'); // Adicione este log
  }

  async enableShutdownHooks(app: INestApplication) {
    // Este método garante que o PrismaClient desconecte do banco de dados
    // de forma graciosa quando a aplicação NestJS é encerrada.
    process.on('beforeExit', async () => {
      await app.close();
    });
    this.$on('beforeExit', async () => { // Usar this.$on com 'beforeExit' é mais robusto
      await this.$disconnect();
      console.log('PrismaService: Desconectado do banco de dados.'); // Adicione este log
    });
  }
}