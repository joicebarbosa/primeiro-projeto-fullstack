// backend/src/users/users.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto';
import { AuthGuard } from '@nestjs/passport'; // Importe AuthGuard

@Controller('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup') 
  async signup(@Body() signupDto: SignupDto) {
    return this.usersService.signup(signupDto); 
  }

  // Rota PROTEGIDA para obter o perfil do usuário logado
  @Get('me') // Acessível em GET http://localhost:3000/users/me
  @UseGuards(AuthGuard('jwt')) // Garante que apenas usuários com um JWT válido podem acessar
  getProfile(@Req() req) {
    // Quando AuthGuard('jwt') é usado, o Passport injeta o objeto do usuário (retornado pela JwtStrategy.validate) em req.user.
    // Este objeto já deve vir sem a senha.
    return req.user; 
  }

  // Remova qualquer outro método 'login' aqui, pois ele deve estar no AuthController.
}