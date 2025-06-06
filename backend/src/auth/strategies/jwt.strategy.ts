// backend/src/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { 
  constructor(private authService: AuthService) { 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o JWT do cabeçalho 'Authorization: Bearer <token>'
      ignoreExpiration: false, // O token expira conforme configurado
      secretOrKey: process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETO', // Use a mesma secret usada para assinar o token no JwtModule
    });
  }

  // Este método é chamado após o token ser validado (estrutura e assinatura).
  // O 'payload' contém os dados que você colocou no token (username, sub - id do usuário).
  async validate(payload: any) {
    // Chama um método do AuthService para buscar o usuário pelo payload (geralmente pelo ID)
    const user = await this.authService.validateUserByPayload(payload);
    if (!user) {
      throw new UnauthorizedException(); // Se o usuário não for encontrado ou for inválido
    }
    // Retorne o usuário. Este objeto será anexado a 'req.user' no controller.
    // Garanta que a senha hash NÃO seja retornada aqui por segurança.
    return user; 
  }
}