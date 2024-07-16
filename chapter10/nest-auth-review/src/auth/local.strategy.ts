import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // PassportStrategy(Strategy) - 믹스인이라고 불리는 방법 클래스의 일부만 확장하고 싶을 때 사용
    constructor(private authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'pw' }); // usernameField의 기본 값이 'username' 이므로 'email'로 변경
    }


    async validate(email: string, pw: string): Promise<any> { // local-strategy에는 인증 시 사용하는 필드명이 정해져 있음
        console.log('3) LocalStrategy 실행');
        const user = await this.authService.validateUser(email, pw); // Repo에 해당 유저 정보 있는지 확인
        if(!user) {
            console.log('결과가 null이면 401 에러');
            return null;
        }

        return user;
    }

}