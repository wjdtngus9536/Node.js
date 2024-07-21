/*  
인증방법은 다양하지만 다양한 방법을 패키지 하나에 담을 필요는 없기 때문에 패스포트에서는 이를 strategy라는 별개의 패키지로 모두 분리해 담습니다.
이중 id, pw로 인증하는 기능은 passport-local 패키지에서 제공합니다.

인증 유형별 strategy
|인증방법  |패키지명  |설명      |
|:--:|:--:|:--:|
|Local    |passport-local| 유저명과 패스워드를 사용해 인증|
|JWT      |passport-jwt  | JSON Web Token을 사용해 인증|
|OAuth    |passport-oauth| 페이스북, 구글 등의 외부 서비스에서 인증|
*/

// NestJS에서는 PassportStrategy를 상속받은 클래스에 인증 로직을 작성합니다.
// email, pw 인증 로직이 있는 LocalStrategy 파일을 작성해봅시다.

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
// 1) PassportStrategy 믹스인: 컴포넌트 재사용을 위해 상속을 해야하지만 해당 클래스의 일부만 확장하고 싶을 때 사용   
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' }); // 2) 기본값이 username이므로 email로 변경해줌
        // local-strategy에는 인증 시 사용하는 필드명이 'username', 'password'로 정해져있음, 우리는 username이 아니라 email로 인증하게 되므로 usernameField 이름을 'email'로 바꿔주는 설정 추가
    }

    // 3) 전달한 email과 pw가 올바른지 검증
    async validate(email: string, password: string): Promise<any> {
        console.log('3) LocalStrategy 실행');
        const user = await this.authService.validateUser(email, password);
        if(!user){ 
            console.log('결과가 null이면 401에러'); 
            return null; 
        } else {
            return user; 
        }
    }
}