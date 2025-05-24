import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity'; // Certifique-se de que o caminho está correto
import { SignupDto } from '../auth/dto/signup.dto'; 
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { username, password } = signupDto;

    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('Nome de usuário já existe.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    const { password: _, ...result } = user;
    return result as User;
  }

  // MÉTODO ORIGINAL: Encontrar usuário por username
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // MÉTODO NOVO: Encontrar usuário por ID (para JWT Strategy)
  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  // NOVO MÉTODO: Validar credenciais do usuário para login
  async validateUserCredentials(username: string, pass: string): Promise<User | null> {
    const user = await this.findOneByUsername(username); // Usando o novo nome do método
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result as User; // Retorna o usuário sem a senha hashed
    }
    return null; // Credenciais inválidas
  }
}