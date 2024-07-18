import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    
    constructor(private userService: UserService) {
        super()
    }
    
    serializeUser(user: any, done: Function) {
        console.log('6) serializeUser()에서 세션에 정보 저장');
        done(null, user.email);
    }

    async deserializeUser(payload: any, done: Function) {
        // 쿠키 정보를 기반으로 session에서 email을 가져옴
        const user = await this.userService.getUser(payload);
        console.log('payload: ', payload);
        console.log('user: ', user);
        if(!user) {
            done(new Error('세션에서 불러온 이메일로 조회했을 때 유저 없음'), null);
            return;
        }

        const { password, ...userInfo} = user;
        done(null, userInfo);
    }
}