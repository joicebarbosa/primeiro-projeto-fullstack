// backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Certifique-se de que o caminho está correto
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto'; // Importe LoginDto

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(signupDto: SignupDto): Promise<any> {
    return this.usersService.signup(signupDto);
  }

  // Valida o usuário para o processo de login (usado pela LocalStrategy)
  async validateUser(username: string, pass: string): Promise<any> {
    console.log('AuthService: validateUser chamado para username:', username);
    const user = await this.usersService.validateUserCredentials(username, pass);
    if (!user) {
      console.log('AuthService: validateUser: Usuário NÃO validado. Credenciais inválidas.');
      return null;
    }
    console.log('AuthService: validateUser: Usuário validado com sucesso:', user.username);
    // Retorna o usuário. O AuthController.login usará este objeto.
    return user; 
  }

  // Gera o token JWT após a validação do usuário
  async login(user: any) {
    console.log('AuthService: login chamado para gerar JWT para usuário:', user.username);
    // Payload do token JWT. 'sub' geralmente é o ID do usuário.
    const payload = { username: user.username, sub: user.id }; 
    const token = this.jwtService.sign(payload); // Assina o token
    console.log('AuthService: JWT gerado com sucesso para', user.username, 'Token:', token);
    return {
      access_token: token, // Retorna o token com a chave 'access_token'
    };
  }

  // Valida o usuário a partir do payload do JWT (usado pela JwtStrategy)
  async validateUserByPayload(payload: any): Promise<any> {
    // Busca o usuário pelo ID (sub) no seu UsersService
    const user = await this.usersService.findOneById(payload.sub); 
    if (!user) {
      throw new UnauthorizedException();
    }
    // Remove a senha hashed do objeto do usuário antes de retorná-lo
    // para que dados sensíveis não sejam expostos em req.user
    const { password, ...result } = user; 
    return result; 
  }
}