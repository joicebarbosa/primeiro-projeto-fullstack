export interface JwtPayload {
  username: string;
  sub: number; // Ou o tipo do seu ID de usuário
  iat?: number;
  exp?: number;
}

// so para teStar o git