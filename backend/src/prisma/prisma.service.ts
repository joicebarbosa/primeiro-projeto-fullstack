// backend/src/prisma/prisma.service.ts
import { INestApplication, Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // ADICIONE ESTE CONSTRUTOR:
  constructor() {
    super({
      log: ['query'], // <-- Esta linha fará o Prisma logar as queries SQL
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('PrismaService: Conectado ao banco de dados.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('PrismaService: Desconectado do banco de dados.');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}