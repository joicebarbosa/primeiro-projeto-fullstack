// backend/src/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local')) // Isso está funcionando, o usuário está sendo validado
  async login(@Req() req) {
    // req.user agora contém o usuário validado pela LocalStrategy
    // Precisamos garantir que authService.login está sendo chamado e retornando o token
    return this.authService.login(req.user); // <--- ESTE É O PONTO CRÍTICO AGORA
  }

  // ... (sua rota de perfil ou outras rotas)
}