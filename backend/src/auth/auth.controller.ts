import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

class SignupDto {
    username: string;
    password: string;
}

class LoginDto {
    username: string;
    password: string;
}

@Controller('auth') // Prefixo da rota
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup') // Rota para signup
    async signup(@Body() body: SignupDto) {
        return this.authService.signup(body.username, body.password);
    }

    @Post('login') // Rota para login
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.username, body.password);
    }

    @Get('signup') // Rota para instruções de signup
    getSignupInstructions() {
        return {
            message: 'Use o método POST para /auth/signup com o corpo: { "username": "seu_usuario", "password": "sua_senha" }',
        };
    }

    @Get('login') // Rota para instruções de login
    getLoginInstructions() {
        return {
            message: 'Use o método POST para /auth/login com o corpo: { "username": "seu_usuario", "password": "sua_senha" }',
        };

    }
}