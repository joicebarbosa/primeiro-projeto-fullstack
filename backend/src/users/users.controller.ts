import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport'; // Importe o AuthGuard para proteger a rota

@Controller('users') // Prefixo da rota
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    return this.usersService.signup(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.usersService.login(body.username, body.password);
  }

  // Nova rota para obter os dados do usuário autenticado
  @UseGuards(AuthGuard('jwt')) // Protege a rota com a estratégia JWT (você precisará configurar isso no seu AuthModule)
  @Get('me')
  async getProfile(@Req() req) {
    // 'req.user' conterá as informações do usuário decodificadas do token JWT
    return req.user;
  }
}
