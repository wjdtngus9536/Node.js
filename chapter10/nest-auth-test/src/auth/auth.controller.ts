import { Body, Get, Post, Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth') // localhost:3000/auth로 시작하는 컨트롤러 정의
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register') // POST로 http 요청을 주고, 주소가 서버주소/auth/register이면 register 메서드를 실행
    async register(@Body() userDto: CreateUserDto) {        // 4) class-validator가 자동으로 유효성 검증
        return await this.authService.register(userDto);    // 5) authService를 사용해 user 정보 저장
    }
}
