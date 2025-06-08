import { UsersService } from './users.service';
import { SignupDto } from '../auth/dto/signup.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(signupDto: SignupDto): Promise<any>;
    getProfile(req: any): any;
}
