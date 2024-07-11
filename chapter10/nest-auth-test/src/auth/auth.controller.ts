import { Body, Get, Post, Request, Response, UseGuards, Controller } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './auth.guard';

@Controller('auth') // localhost:3000/auth로 시작하는 컨트롤러 정의
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register') // POST로 http 요청을 주고, 주소가 서버주소/auth/register이면 register 메서드를 실행
    async register(@Body() userDto: CreateUserDto) {        // 4) class-validator가 자동으로 유효성 검증
        return await this.authService.register(userDto);    // 5) authService를 사용해 user 정보 저장
    }

    // login 핸들러 메서드 작성
    @Post('login')
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);

        // 3) 유저 정보가 있으면, 쿠키 정보를 Response에 저장
        if (userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                maxAge: 1000 * 60 * 24 * 7, // 7days 단위는 mille seconds
            });
        }
        return res.send({ message: 'login success' });
    }

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res) {

    }
}
