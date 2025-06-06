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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signup(signupDto) {
        const { username, password } = signupDto;
        const existingUser = await this.usersRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new common_1.ConflictException('Nome de usuário já existe.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });
        await this.usersRepository.save(user);
        const { password: _, ...result } = user;
        return result;
    }
    async findOneByUsername(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
    async findOneById(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async validateUserCredentials(username, pass) {
        console.log('UsersService: validateUserCredentials chamado para username:', username);
        const user = await this.findOneByUsername(username);
        if (!user) {
            console.log('UsersService: validateUserCredentials: Usuário NÃO encontrado no DB:', username);
            return null;
        }
        console.log('UsersService: validateUserCredentials: Usuário encontrado:', user.username);
        const isPasswordMatching = await bcrypt.compare(pass, user.password);
        if (!isPasswordMatching) {
            console.log('UsersService: validateUserCredentials: Senha INCORRETA para', username);
            return null;
        }
        console.log('UsersService: validateUserCredentials: Senha CORRETA para', username);
        const { password, ...result } = user;
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map