// backend/src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Fornece o PrismaService
  exports: [PrismaService],   // Exporta o PrismaService para que outros módulos possam usá-lo
})
export class PrismaModule {}