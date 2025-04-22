import { AuthService } from './auth/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: {
        username: string;
        password: string;
    }): Promise<import("./users/user.entity").User>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
