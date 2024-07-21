import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

// PassportSerializer 상속받음
@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) { // 2) userService를 주입받음
        super();
    }

    // 3) 세션에 정보를 저장할 때 사용
    // user 정보는 LocalAuthGuard의 canActivate() 메서드에서 super.logIn(request)를 호출할 때 
    // 내부적으로 request에 있는 user 정보를 꺼내서 전달하면서 serializeUser()를 실행합니다.
    serializeUser(user: any, done: (err: Error, user: any) => void): any { // user 변수와 done 함수를 매개변수로 받아옴
        console.log('6) 세션에 정보 저장'); 
        done(null, user.email); // 세션에 저장할 정보
    }

    // 4) 인증이 되었는지 세션에서 정보를 꺼내올 때 사용
    // payload = 세션에서 꺼내온 값
    async deserializeUser(payload: any, done: (err: Error, payload: any) => void ): Promise<any> {
        const user = await this.userService.getUser(payload); // 이메일(payload)로 해당하는 유저가 있는지 확인
        
        // 5) 유저 정보가 없는 경우에 done() 함수에 에러 전달
        if (!user) {
            done(new Error('No User'), null);
            return;
        }
        // 유저 정보가 있다면
        const { password, ...userInfo } = user;
        done(null, userInfo);
    }
}