import { IsString, IsNotEmpty, MinLength, Matches, IsEmail, IsOptional } from 'class-validator';

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

  @IsEmail({}, { message: 'Email inválido' }) // Validação para formato de email
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  email: string; // Adicionado o campo de email

  @IsString()
  @IsOptional() // Use IsOptional se você não quer que firstName seja obrigatório
  @IsNotEmpty({ message: 'Primeiro nome não pode ser vazio' }) // Adicione se for obrigatório
  firstName?: string; // Adicionado o campo de primeiro nome

  @IsString()
  @IsOptional() // Use IsOptional se você não quer que lastName seja obrigatório
  @IsNotEmpty({ message: 'Sobrenome não pode ser vazio' }) // Adicione se for obrigatório
  lastName?: string; // Adicionado o campo de sobrenome
}