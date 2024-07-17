import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // 회원 가입
    @Post('/create')
    createUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    // email 받아서 회원 찾기
    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) {
        return await this.userService.getUser(email);
    }
    
}
