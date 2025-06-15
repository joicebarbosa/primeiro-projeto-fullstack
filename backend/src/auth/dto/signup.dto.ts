
import { IsString, IsNotEmpty, MinLength, Matches, IsOptional } from 'class-validator';

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

  // REMOVIDO: email: string; // Adicionado o campo de email

  @IsString()
  @IsOptional() // Mantido como opcional, como no seu schema.prisma
  // REMOVIDO: @IsNotEmpty({ message: 'Primeiro nome não pode ser vazio' }) // Removido para ser consistente com IsOptional
  firstName?: string; // Adicionado o campo de primeiro nome

  @IsString()
  @IsOptional() // Mantido como opcional, como no seu schema.prisma
  // REMOVIDO: @IsNotEmpty({ message: 'Sobrenome não pode ser vazio' }) // Removido para ser consistente com IsOptional
  lastName?: string; // Adicionado o campo de sobrenome
}

