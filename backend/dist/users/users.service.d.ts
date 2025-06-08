import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../auth/dto/signup.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(signupDto: SignupDto): Promise<any>;
    validateUserCredentials(username: string, pass: string): Promise<any | null>;
    findOneById(id: number): Promise<any | null>;
}
