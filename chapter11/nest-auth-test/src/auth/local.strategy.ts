import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            console.log('authService.validateUser() 결과가 null이면 401에러');
            return null;
        } else {
            console.log('4) authService.validateUser() 결과가 user이면 super.canActivate(context)에 true 반환')
            return user; // user를 반환하면 어디로 가는가? serialize가 실패하는걸 보면 serializer로 가는 듯 하다.
        }
    }
}