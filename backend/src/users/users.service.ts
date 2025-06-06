// backend/src/users/users.service.ts
// ... (imports como Prisma, bcrypt, etc.)
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service'; // Se estiver usando Prisma
import { SignupDto } from '../auth/dto/signup.dto'; // Se estiver usando DTO

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // Injetando o PrismaService

  async signup(signupDto: SignupDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: signupDto.username,
          password: hashedPassword,
          email: signupDto.email, // Se você tiver email no DTO
          firstName: signupDto.firstName, // Se você tiver firstName
          lastName: signupDto.lastName, // Se você tiver lastName
        },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') { // Erro de unique constraint (ex: username já existe)
        throw new BadRequestException('Nome de usuário ou email já em uso.');
      }
      throw error;
    }
  }

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

  // MÉTODO IMPORTANTE PARA JwtStrategy e UsersController.getProfile
  async findOneById(id: number): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    return user; // Já retorna sem a senha por causa do 'select'
  }
}