import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity'; // Importar a entidade User

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signup(username: string, password: string): Promise<User> {
        return this.usersService.createUser (username, password);
    }

    async login(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.validateUser (username, password);
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { username: user.username, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        return { access_token };
    }
}