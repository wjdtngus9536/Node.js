import { Injectable } from "@nestjs/common";
// Guard의 AuthGuard 패키지의 클래스 내부 매개변수의 타입인 ExecutionContext의 메서드 switchToHttp().getRequest()로 받은 request 객체에
// request.isAuthenticated() 메서드가 세션에서 정보를 읽어오는데 해당 세션을 어떻게 읽어오는지가 
// 모듈 내의 session.serializer.ts라는 파일명을 통해서인지 PassportSerializer라는 클래스를 상속한 클래스가 작성된지 여부를 알 수 있는 것인지 모르겠다.

import { PassportSerializer } from "@nestjs/passport"; 
import { UserService } from "src/user/user.service";



/*
Non-abstract class 'SessionSerializer' is missing implementations for the following members of 
'PassportSerializer': 'serializeUser', 'deserializeUser'.ts(2654)
 */
@Injectable()
export class SessionSerializer extends PassportSerializer { 
    constructor(private userService: UserService) {
        super(); // PassportSerializer의 객체 초기화, 자식 class의 constructor는 부모 클래스의 private field 까지 초기화 해줄 수 없음 
    }


    // 세션에 정보를 저장하는 함수, AuthGuard('local')의 canActivate()메서드에서 super.logIn(request)를 호출할 때 
    // 내부적으로 request의 user 정보를 꺼내서 전달하면서 serializeUser() 실행, 그렇다면 done이라는 함수는 누가 전달해주는가? 
    // A: logIn() 메서드 내부에서 serializeUser() 호출 done에 제공되는 함수는 Passport 자체에서 제공
    serializeUser(user: any, done: Function) {
        console.log('6) 세션에 정보 저장');
        done(null, user.email); // 세션에 저장할 정보가 email뿐이라는 의미, 유저를 식별하는 데 사용할 최소한의 정보
    }


    // 세션에서 정보를 꺼내오는 함수
    async deserializeUser(payload: any, done: Function) {
        const user = await this.userService.getUser(payload); // payload(세션에서 꺼내온 값) = email, Repo에서 사용자 정보 가져오기
        if(!user) {
            done(new Error('no User'), null);
            return;
        }

        const {pw, ...userInfo} = user;
        done(null, userInfo);
    }
}