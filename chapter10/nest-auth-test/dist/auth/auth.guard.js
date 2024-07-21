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
exports.AuthenticatedGuard = exports.LocalAuthGuard = exports.LoginGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
let LoginGuard = class LoginGuard {
    constructor(authService) {
        this.authService = authService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.cookies['login']) {
            return true;
        }
        if (!request.body.email || !request.body.password) {
            return false;
        }
        const user = await this.authService.validateUser(request.body.email, request.body.password);
        if (!user) {
            return false;
        }
        request.user = user;
        return true;
    }
};
exports.LoginGuard = LoginGuard;
exports.LoginGuard = LoginGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LoginGuard);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
    async canActivate(context) {
        console.log('1) {{server}}/auth.login3 호출');
        console.log('2) LoginAuthGuard 실행');
        const result = (await super.canActivate(context));
        console.log('4) 성공인 경우 true 반환', result);
        const request = context.switchToHttp().getRequest();
        console.log('5) SessionSerializer 실행');
        await super.logIn(request);
        return result;
    }
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
let AuthenticatedGuard = class AuthenticatedGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
};
exports.AuthenticatedGuard = AuthenticatedGuard;
exports.AuthenticatedGuard = AuthenticatedGuard = __decorate([
    (0, common_1.Injectable)()
], AuthenticatedGuard);
//# sourceMappingURL=auth.guard.js.map