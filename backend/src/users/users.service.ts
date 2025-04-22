import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Certifique-se de que você tenha uma entidade User
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  login(username: string, password: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      return null; // Retorna null se o usuário não for encontrado
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null; // Retorna null se a senha for inválida
    }

    return user; // Retorna o usuário se a senha estiver correta
  }

  async createUser(username: string, password: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash da senha
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return newUser; // Retorna o novo usuário
  }

  async signup(
    username: string,
    password: string,
  ): Promise<{ id: number; username: string }> {
    const newUser = await this.createUser(username, password);
    return { id: newUser.id, username: newUser.username }; // Retorna o id e o username do novo usuário
  }

  // Novo método para buscar um usuário pelo ID
  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }
}
