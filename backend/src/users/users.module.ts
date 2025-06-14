import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Verifique se o caminho está correto
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [TypeOrmModule.forFeature([User ]), PrismaModule ], // Registra o repositório do User
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService], // Exporta o UsersService se for usado em outros módulos
})
export class UsersModule {}