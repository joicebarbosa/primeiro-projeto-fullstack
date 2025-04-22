import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    login(username: string, password: string): void;
    constructor(usersRepository: Repository<User>);
    validateUser(username: string, password: string): Promise<User | null>;
    createUser(username: string, password: string): Promise<User>;
    signup(username: string, password: string): Promise<{
        id: number;
        username: string;
    }>;
    findById(id: number): Promise<User | null>;
}
