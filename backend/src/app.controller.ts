import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // <--- CERTIFIQUE-SE DE QUE ESTÁ VAZIO OU COM O PREFIXO CORRETO SE VOCÊ MUDOU
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // NOVA ROTA DE TESTE
  @Get('api/teste') // O caminho para esta rota será /api/teste
  getTeste(): string {
    return 'Olá do Backend! A comunicação está funcionando.';
  }
}