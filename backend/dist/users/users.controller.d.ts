import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(body: {
        username: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<void>;
    getProfile(req: any): Promise<any>;
}
