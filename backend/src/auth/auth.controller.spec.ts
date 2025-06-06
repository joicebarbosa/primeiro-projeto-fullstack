import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; // Ajuste o caminho se seu auth.service.ts estiver em outro lugar

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username', // Garante que o campo 'username' será usado
      passwordField: 'password', // Garante que o campo 'password' será usado
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // A estratégia local chama este método para validar as credenciais.
    // Ela usa o método 'validateUser' do seu AuthService.
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Retorna o usuário. O Passport o anexará a req.user.
    // Certifique-se de NÃO retornar a senha aqui.
    const { password: userPassword, ...result } = user; // Desestrutura para remover a senha
    return result;
  }
}