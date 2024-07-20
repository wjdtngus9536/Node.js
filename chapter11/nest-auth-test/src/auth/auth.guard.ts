import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {

    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        return result;
    }
}









@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('1) http://localhost:3000/auth/login3 호출');
        console.log('2) LocalAuthGuard 실행');
        console.log('3) super.canActivate(context)에서 LocalStrategy 실행');

        const result = (await super.canActivate(context)) as boolean;
        
        const request = context.switchToHttp().getRequest();
        console.log('5) SessionSerializer 실행');
        await super.logIn(request);
        return result;
    }
}

export class AuthenticatedGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const isAuth = request.isAuthenticated();
        console.log('인증 가드 isAuthenticated() return:', isAuth);
        return isAuth; 
    }
}

