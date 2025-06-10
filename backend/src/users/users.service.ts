// backend/src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se necessário
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../auth/dto/signup.dto'; // Verifique o caminho correto para o DTO

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    try {
      console.log('Dados enviados para o Prisma:', {
        username: signupDto.username,
        password: hashedPassword,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
      });
      const newUser = await this.prisma.user.create({
        data: {
          username: signupDto.username,
          password: hashedPassword,
          firstName: signupDto.firstName,
          lastName: signupDto.lastName,
        },
      });
      return newUser;
    } catch (error) {
      console.error('Erro no signup (possivelmente UNIQUE constraint ou outro):', error);
      throw error; // Re-lança o erro para o controlador lidar
    }
  }

  // >>>>>> VERIFIQUE SE ESTES MÉTODOS ESTÃO DENTRO DA CLASSE UsersService <<<<<<<
  // Se estiverem fora, mova-os para dentro da classe.
  async validateUserCredentials(username: string, pass: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log(`UsersService: validateUserCredentials: Usuário NÃO encontrado no DB: ${username}`);
      return null;
    }

    console.log(`UsersService: validateUserCredentials: Usuário encontrado: ${username}`);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      console.log(`UsersService: validateUserCredentials: Senha INCORRETA para ${username}`);
      return null;
    }

    console.log(`UsersService: validateUserCredentials: Senha CORRETA para ${username}`);

    const { password, ...result } = user;
    return result; // Retorna o usuário sem a senha hashed
  }

  async findOneById(id: number): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user; // Já retorna sem a senha por causa do 'select'
  }
}
