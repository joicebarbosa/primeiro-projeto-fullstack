import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // CONFIRME O CAMINHO AQUI
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from '../auth/dto/signup.dto'; // CONFIRME O CAMINHO AQUI
import { LoginDto } from '../auth/dto/login.dto'; // CONFIRME O CAMINHO AQUI

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para registro (AuthService.register)
  async register(signupDto: SignupDto): Promise<any> {
    return this.usersService.signup(signupDto); // Chama o UsersService.signup
  }

  // Método para validar usuário durante o processo de login
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUserCredentials(username, pass); // Chama o UsersService.validateUserCredentials
    if (!user) {
      return null;
    }
    return user;
  }

  // Método de login (AuthService.login) - recebe o usuário validado
  async login(user: any) { // Recebe o objeto 'user' que já foi validado
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // NOVO MÉTODO: Para validar o usuário pelo payload do JWT
  async validateUserByPayload(payload: any): Promise<any> {
    // Aqui usamos o findOneById que adicionamos no UsersService
    const user = await this.usersService.findOneById(payload.sub); // Assume que payload.sub é o ID
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}