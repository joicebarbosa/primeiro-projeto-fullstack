import { UsersService } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(signupDto: SignupDto): Promise<import("./user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        message: string;
    }>;
}
