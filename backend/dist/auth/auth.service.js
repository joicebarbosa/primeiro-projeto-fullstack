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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(signupDto) {
        return this.usersService.signup(signupDto);
    }
    async validateUser(username, pass) {
        console.log('AuthService: validateUser chamado para username:', username);
        const user = await this.usersService.validateUserCredentials(username, pass);
        if (!user) {
            console.log('AuthService: validateUser: Usuário NÃO validado. Credenciais inválidas.');
            return null;
        }
        console.log('AuthService: validateUser: Usuário validado com sucesso:', user.username);
        return user;
    }
    async login(user) {
        console.log('AuthService: login chamado para gerar JWT para usuário:', user.username);
        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);
        console.log('AuthService: JWT gerado com sucesso para', user.username, 'Token:', token);
        return {
            access_token: token,
        };
    }
    async validateUserByPayload(payload) {
        const user = await this.usersService.findOneById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const { password, ...result } = user;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map