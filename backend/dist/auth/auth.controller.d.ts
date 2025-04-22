import { AuthService } from './auth.service';
declare class SignupDto {
    username: string;
    password: string;
}
declare class LoginDto {
    username: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto): Promise<import("../users/user.entity").User>;
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    getSignupInstructions(): {
        message: string;
    };
    getLoginInstructions(): {
        message: string;
    };
}
export {};
