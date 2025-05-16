import { Controller, Post, Body, Get, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto'; 
import { LoginDto } from './dto/login.dto';   // Importe o DTO se estiver em arquivo separado


@Controller('auth') // Prefixo da rota
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') // Rota para signup
  async signup(@Body(ValidationPipe) body: SignupDto) { // Use ValidationPipe aqui
    return this.authService.signup(body.username, body.password);
  }

  @Post('login') // Rota para login
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
  }

  @Get('signup') // Rota para instruções de signup
  getSignupInstructions() {
    return {
      message:
        'Use o método POST para /auth/signup com o corpo: { "username": "seu_usuario", "password": "sua_senha" }',
    };
  }

  @Get('login') // Rota para instruções de login
  getLoginInstructions() {
    return {
      message:
        'Use o método POST para /auth/login com o corpo: { "username": "seu_usuario", "password": "sua_senha" }',
    };
  }
}