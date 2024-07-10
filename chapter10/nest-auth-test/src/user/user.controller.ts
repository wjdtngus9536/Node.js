import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Param, 
    Put, 
    Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user') // 1) 컨트롤러 설정 데코레이터, 주소가 user로 시작된다는 것을 의미
export class UserController {
    constructor(private userService: UserService) {} // 2) 유저 서비스 주입

    @Post('/create')
    createUser(@Body() user: CreateUserDto) { // 3) 유저 생성, Request의 Body에 있는 내용을 User 객체에 담는다.
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) { // 데코레이터를 통해 특정 요청에 대한 값을 접근할 수 있다. e.g., const email = req.param.email;
        const user = await this.userService.getUser(email);
        console.log(user);
        return user;
    }

    @Put('/update/:email')
    updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
        console.log(user);
        return this.userService.updateUser(email, user);
    }

    @Delete('/delete/:email')
    deleteUser(@Param('email') email: string) {
        return this.userService.deleteUser(email);
    }
}
