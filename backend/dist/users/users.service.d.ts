import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { SignupDto } from '../auth/dto/signup.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    signup(signupDto: SignupDto): Promise<User>;
    findOneByUsername(username: string): Promise<User | null>;
    findOneById(id: number): Promise<User | null>;
    validateUserCredentials(username: string, pass: string): Promise<User | null>;
}
