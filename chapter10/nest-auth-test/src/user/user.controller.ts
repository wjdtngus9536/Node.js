import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user') // 1) 컨트롤러 설정 데코레이터, 주소가 user로 시작된다는 것을 의미
export class UserController {
    constructor(private userService: UserService) {} // 2) 유저 서비스 주입

    @Post('/create')
    createUser(@Body() user: User) { // 3) 유저 생성, Request의 Body에 있는 내용을 User 객체에 담는다.
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) { // 4) 한 명의 유저 찾기
        const user = await this.userService.getUser(email);
        console.log(user);
        return user;
    }

    @Put('/update/:email')
    // 5) 유저 정보 업데이트
    updateUser(@Param('email') email: string, @Body() user: User) {
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string) { // 6) 유저 삭제
        return this.userService.deleteUser(email);
    }
}
