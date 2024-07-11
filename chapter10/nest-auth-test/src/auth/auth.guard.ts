import { CanActivate, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: any): Promise<boolean> {
        const request = context.switchToHTTP().getRequest();

        if (request.cookies['login']) {
            return true;
        }

        if (!request.body.email || !request.body.password) {
            return false;
        }
        // 8) 인증 로직은 기존의 authService.validateUser 사용
        const user = await this.authService.validateUser(request.body.email, request.body.password);
        if(!user) {
            return false;
        }
        request.user = user; // 9) 유저 정보 있으면 request에 user 정보를 추가하고 true 반환
        return true;
    }
}