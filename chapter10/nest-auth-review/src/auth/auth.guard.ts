// 가드는 특정 상황(권한, 롤, 액세스 컨트롤)에서 받은 요청request을 가드를 추가한 라우트 메서드에서 처리할지 말지를 결정하는 역할을 합니다.
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    // 인증됐는지 검사하기
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 로그인
        const request = context.switchToHttp().getRequest(); 
        if (request.cookies['login']) { // 쿠키 있는 경우에는 가드 승인
            return true; 
        } 
        
        // 인증
        if (!request.body.email || !request.body.pw) { // 쿠키도 없는데 id or pw 하나라도 똑바로 안온 경우 미승인
            console.log('가드 미승인'); 
            return false; 
        } 

        // 쿠키 없을 때 인증 로직
        // 로그인
        const userInfo = await this.authService.validateUser(request.body.email, request.body.pw);
        if (userInfo) { 
            // 있으면 request에 유저 정보를 추가해서 핸들러 함수에서 처리할 수 있게 한다.
            request.user = userInfo;
            return true;
        }
        // 인증
        return false; 
    }

}

@Injectable()
// HTTP req으로 받은 email과 pw 정보로 유효한 user 정보가 있는지 확인해, 유효할 경우 유저의 정보를 세션에 저장 ☆ session의 cookie maxAge를 main.ts에서 설정했음
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: any): Promise<boolean> {
        console.log('1) {{server}}/auth.login3 호출')
        console.log('2) LoginAuthGuard 실행');
        // super.canActivate()의 메서드는 아직 구현되어 있지 않음. localstrategy.ts 파일에서 LocalStrategy 클래스를 생성한 후 validate() 메서드를 구현해야 실행 가능
        const result = (await super.canActivate(context)) as boolean; // passport-local의 로직을 구현한 메서드를 실행
        console.log('4) 성공인 경우 true 반환', result);
        
        const request = context.switchToHttp().getRequest();
        console.log('5) SessionSerializer 실행');
        await super.logIn(request); // 세션에 저장, 세선을 저장하고 꺼내오는 방법을 session.serializer.ts 파일에서 구현해야 AuthGuard.logIn() 메서드 사용 가능
        return result;
    }
}

// HTTP request에 있는 쿠키를 찾아 쿠키에 있는 정보로 세션을 확인해 로그인 돼있는 user인지 판단
export class AuthenticatedGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        // 세션에 데이터를 저장하고 돌려주는 response 값에 connect.sid 라는 이름의 쿠키를 만들게 됨 
        // 이후 request에 해당 쿠키값을 같이 전송하면
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인
    }   
}