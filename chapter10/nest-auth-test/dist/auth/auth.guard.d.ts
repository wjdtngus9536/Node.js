import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
export declare class LoginGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: any): Promise<boolean>;
}
declare const LocalAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class LocalAuthGuard extends LocalAuthGuard_base {
    canActivate(context: any): Promise<boolean>;
}
export declare class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
export {};
