import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+\.[a-zA-Z]+$/, {
    message: 'O nome de usuário deve estar no formato nome.sobrenome',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      'A senha deve conter ao menos uma letra maiúscula e um caractere especial',
  })
  password: string;
}