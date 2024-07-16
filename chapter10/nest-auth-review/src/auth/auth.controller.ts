import { Body, Controller, Post, Get, Request, Response, UseGuards } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard, LocalAuthGuard, AuthenticatedGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }


    @Post('login')
    async login(@Request() req, @Response() res) {
    // async login(@Body() createUserDto: CreateUserDto, @Response() res) {
        const userInfo = await this.authService.validateUser(req.body.email, req.body.pw);
        if (userInfo) {
            res.cookie('login', JSON.stringify(userInfo), { // 클라이언트(브라우저 등)와 데이터를 주고받을 때는 보통 데이터 전송 객체를 DTO로 따로 만들어서 사용
                httpOnly: false, // 서버에서만 읽게하기, 기본 값도 false, 쿠키 정보를 브라우저에서 읽지 않아도 된다면(js의 Document.cookie API를 통해 쿠키를 사용하는 것이 아니라면) true로 설정하는 편이 보안에 유리
                maxAge: 1000 * 60 * 10 // 10분(600,000ms)
            });
        }
        return res.send({ message: 'login success' })
    }


    @UseGuards(LoginGuard)
    @Post('login2')
    // 여기까지 온 시점에서 이미 인증은 성공
    async login2(@Request() req, @Response() res) {
        // 쿠키는 없지만 request에 user 정보가 있으면 응답값에 쿠키 추가
        if(!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), { 
                httpOnly: true, 
                maxAge: 1000 * 10
            });
        }
        return res.send({ message: 'login2 success' });
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return '로그인 된 때 10초 동안만 이 글이 보입니다.';
    }


    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req) {
        console.log('7) 클라이언트에 connect.sid 쿠키를 포함하여 응답 전송');
        return req.user;
    }


    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.session;
    }

}
