import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {};

    // async register(userDto: CreateUserDto) { ★
    async register(userDto) {
        const user = await this.userService.getUser(userDto.email);
        if (user) { throw new HttpException('해당 유저가 이미 있습니다.', HttpStatus.BAD_REQUEST); }

        // 패스워드 암호화
        const encryptedPassword = hashSync(userDto.pw, 10);
        try {
            // 암호화한 비밀번호로 수정해서 userService의 createUser 메서드로 넘겨줌
            userDto.pw = encryptedPassword;
            const user = await this.userService.createUser(userDto);

            userDto.pw = undefined;
            return user;
        }
        catch (error) {
            throw new HttpException('db server error in service.ts register function', 500);
        }
    }
}
