import { AuthService } from './auth.service';
import { SignupDto } from '../auth/dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<any>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
