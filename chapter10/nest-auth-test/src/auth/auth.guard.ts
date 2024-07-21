import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport"; // 1) NestJS에서는 패스포트를 편하게 사용할 수 있도록 @nestjs/passport를 제공. 
// 패스포트 인증에 가드를 사용할 수 있도록 감싸둔 AuthGuard를 제공하는 가이브러리

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: any): Promise<boolean> {
        // 컨텍스트에서 리퀘스트 정보를 가져옴
        const request = context.switchToHttp().getRequest();
        
        // 쿠키가 있으면 인증된 것 true return
        if (request.cookies['login']) { return true; }

        // 쿠키가 없으면 request의 body 정보 확인 둘 중 하나라도 없으면 false return
        if (!request.body.email || !request.body.password) { return false; }
        
        // 8) 인증 로직은 기존의 authService.validateUser 사용
        const user = await this.authService.validateUser(request.body.email, request.body.password);
        if(!user) { return false; }
        
        // 유저 정보가 있으면 request에 user 정보를 추가하고 true 반환
        request.user = user;
        return true;
    }
}

@Injectable()
// HTTP요청으로 받은 email과 pw 정보로 유효한 user 정보가 있는지 확인해, 유효할 경우 유저의 정보를 세션에 저장
export class LocalAuthGuard extends AuthGuard('local') { // AuthGuard 상속, AuthGuard('local')은 로컬 스트래티지를 사용
    async canActivate(context: any): Promise<boolean> {
        console.log('1) {{server}}/auth.login3 호출')
        console.log('2) LoginAuthGuard 실행');
        const result = (await super.canActivate(context)) as boolean; // canActivate는 Promise를 반환, Promise의 확인된 값이 부울로 처리되어야 함을 TypeScript 컴파일러에 알려줍니다.
        console.log('4) 성공인 경우 true 반환', result);
        // 3) 로컬 스트래티지 실행
        const request = context.switchToHttp().getRequest();
        console.log('5) SessionSerializer 실행');
        await super.logIn(request); // 로그인 처리 = 세션 저장, 세션을 저장하고 꺼내오는 방법은 session.serializer.ts 파일에 작성
        return result;
    }
}

@Injectable()
// HTTP 요청에 있는 쿠키를 찾아 쿠키에 있는 정보로 세션을 확인해 로그인이 완료된 사용자인지 판별
// 세션에 데이터를 저장하고 돌려주는 응답(response)값에 connect.sid라는 이름의 쿠키를 만들게 됩니다.
// 이후의 요청에 해당 쿠키값을 같이 전송하면 세션에 있는 값을 읽어서 인증 여부를 확인할 때 사용하는 가드입니다.
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated(); // 5) 세션에서 정보를 읽어서 인증 확인
    }
}