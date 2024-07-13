import { Controller } from '@nestjs/common';
import { Body, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // 유저 생성 메서드
    @Post('/create')
    createUser(@Body() user: User){
        return this.userService.createUser(user);
        // controller의 메서드에서 return을 하게 되면 어디로 가는가?
    }

    // 한 명의 유저 찾기 메서드
    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        const user = await this.userService.getUser(email);
        console.log(user);
        return user;
    }

    @Put('/update/:email')
    // 유저 정보 업데이트
    updateUser(@Param('email') email: string, @Body() user: User){
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    // 유저 삭제
    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string){
        return this.userService.deleteUser(email); 
    }
}
