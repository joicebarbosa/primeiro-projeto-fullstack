import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service'; // Importe o AuthService
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto'; 
import { AuthGuard } from '@nestjs/passport'; // Para o login com Passport

@Controller('auth') // Mudei para 'auth' se seu frontend estiver chamando /auth/signup e /auth/login
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') // Rota: /auth/signup
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto); // Chama o método register do AuthService
  }

  @Post('login') // Rota: /auth/login
  @UseGuards(AuthGuard('local')) // Use AuthGuard('local') se você tiver uma LocalStrategy
  async login(@Req() req) { // O @Req() req terá o usuário validado pelo LocalStrategy
    // Se você estiver usando Passport Local Strategy, o usuário já estará em req.user
    return this.authService.login(req.user); // Chama o método login do AuthService
  }

  // Exemplo de rota protegida por JWT (se você tiver)
  // @Get('profile')
  // @UseGuards(AuthGuard('jwt'))
  // getProfile(@Req() req) {
  //   return req.user;
  // }
}