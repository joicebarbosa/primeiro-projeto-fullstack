import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    try {
      console.log('Dados enviados para o Prisma:', {
        username: signupDto.username,
        // REMOVIDO: email: signupDto.email, // Já removido, garantindo que não há referência aqui
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
      // Importante: No seu modelo Prisma, 'id', 'createdAt' e 'updatedAt' são gerados automaticamente.
      // Certifique-se de que não está esperando 'email' aqui se ele foi removido do schema.
      return newUser;
    } catch (error) {
      console.error('Erro no signup:', error);
      throw error;
    }
  }

  async validateUserCredentials(username: string, pass: string): Promise<any | null> {
    // Certifique-se de que o findUnique NÃO está tentando buscar 'email'
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log(`UsersService: validateUserCredentials: Usuário NÃO encontrado no DB: ${username}`);
      return null;
    }

    console.log(`UsersService: validateUserCredentials: Usuário encontrado: ${username}`);

    // A senha do usuário no DB pode ser criptografada. Comparar com a senha fornecida.
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      console.log(`UsersService: validateUserCredentials: Senha INCORRETA para ${username}`);
      return null;
    }

    console.log(`UsersService: validateUserCredentials: Senha CORRETA para ${username}`);

    // Retorna o usuário sem a senha (para segurança)
    const { password, ...result } = user;
    return result;
  }

  async findOneById(id: number): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      // Certifique-se de que o select NÃO inclui 'email'
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}