import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service'; // Importe o AuthService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) { // Injete o AuthService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETO', // Use uma variável de ambiente real!
    });
  }

  async validate(payload: any) {
    // Chame o método do AuthService para validar o usuário pelo payload
    const user = await this.authService.validateUserByPayload(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}