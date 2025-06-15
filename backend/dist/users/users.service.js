"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signup(signupDto) {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        try {
            console.log('Dados enviados para o Prisma:', {
                username: signupDto.username,
                password: hashedPassword,
                firstName: signupDto.firstName,
                lastName: signupDto.lastName,
            });
            const newUser = await this.prisma.user.create({
                data: {
                    username: signupDto.username,
                    password: hashedPassword,
                    firstName: signupDto.firstName,
                    lastName: signupDto.lastName,
                },
            });
            return newUser;
        }
        catch (error) {
            console.error('Erro no signup:', error);
            throw error;
        }
    }
    async validateUserCredentials(username, pass) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            console.log(`UsersService: validateUserCredentials: Usuário NÃO encontrado no DB: ${username}`);
            return null;
        }
        console.log(`UsersService: validateUserCredentials: Usuário encontrado: ${username}`);
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            console.log(`UsersService: validateUserCredentials: Senha INCORRETA para ${username}`);
            return null;
        }
        console.log(`UsersService: validateUserCredentials: Senha CORRETA para ${username}`);
        const { password, ...result } = user;
        return result;
    }
    async findOneById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map