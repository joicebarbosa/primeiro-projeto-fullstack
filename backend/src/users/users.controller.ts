import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto'; // Importe seu DTO de Signup
import { LoginDto } from '../auth/dto/login.dto'; // Importe seu DTO de Login
// import { AuthGuard } from '@nestjs/passport'; // Se você estiver usando passport para login
// import { Request, Response } from 'express'; // Se precisar de tipagem para req/res

@Controller('users') // Prefixo para todas as rotas deste controller. Ex: /users/signup
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup') // Rota: /users/signup
  async signup(@Body() signupDto: SignupDto) {
    // As validações do SignupDto (username, password) serão AUTOMATICAMENTE aplicadas aqui
    // pelo ValidationPipe global do NestJS (que você provavelmente configurou no main.ts).
    // Se a validação falhar, o NestJS lançará um BadRequestException.

    return this.usersService.signup(signupDto); // Chama o serviço para criar o usuário
  }

  @Post('login') // Rota: /users/login
  async login(@Body() loginDto: LoginDto) {
    // Implemente a lógica de login aqui (você provavelmente já tem isso)
    // Ex: return this.usersService.login(loginDto.username, loginDto.password);
    return { message: 'Login de exemplo! Implemente a lógica real aqui.' };
  }

}