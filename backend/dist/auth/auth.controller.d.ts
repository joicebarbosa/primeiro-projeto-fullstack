import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
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
