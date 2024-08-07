import { Controller, Body, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthenticatedGuard, GoogleAuthGuard, LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // 구글 로그인으로 이동하는 라우터 메서드
    @Get('to-google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Request() req) {}


    // 구글 로그인 성공 시 실행하는 라우터 메서드 입니다.
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Request() req, @Response() res) {
        const {user} = req;
        return res.send(user);
    }






    
    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }


    @Post('login')
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(req.body.email, req.body.password);
        console.log('test login', userInfo);

        if(userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                maxAge: 1000 * 60 // 60초
            });
            return res.send({ message: '로그인 성공' });
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req) {
        console.log('7) AuthController: 클라이언트에 connect.sid 쿠키를 포함하여 응답 전송');
        return req.user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) {
        return req.user;
    }

    
}
