import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'; // Adapte o caminho se necessário

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Nome do campo do seu payload de login para o username
      passwordField: 'password', // Nome do campo do seu payload de login para a senha
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // Este método é chamado quando a estratégia 'local' é invocada
    // Você precisa ter um método validateUser no seu AuthService que verifica as credenciais
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Retorne o usuário (ou parte dele) que será injetado no request.user
    // Não retorne a senha ou dados sensíveis aqui.
    return user;
  }
}