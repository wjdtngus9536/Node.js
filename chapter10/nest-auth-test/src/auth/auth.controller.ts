import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard } from './auth.guard';

@Controller('auth') // localhost:3000/auth로 시작하는 컨트롤러 정의
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('register') // POST로 http 요청을 주고, 주소가 서버주소/auth/register이면 register 메서드를 실행
    async register(@Body() userDto: CreateUserDto) {        // 4) class-validator가 자동으로 유효성 검증
        return await this.authService.register(userDto);    // 5) authService를 사용해 user 정보 저장
    }


    
    // login 핸들러 메서드, validateUser() 메서드를 사용해 인증 결과를 쿠키에 추가
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
        // 쿠키 정보는 없지만 request에 user 정보가 있다면, 쿠키 정보를 Response에 저장
        if (!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly:true, 
                maxAge: 1000 * 10
            });
        }
        return res.send({ messsage: 'login2 success' });
    }

    // 4) 로그인을 한 때만 실행되는 메서드
    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인된 때만 이 글이 보입니다.';
    }

    // 세션을 사용하는 로그인 테스트를 위한 핸들러 메서드 추가

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req) {
        return req.session;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.user;
    }
}
