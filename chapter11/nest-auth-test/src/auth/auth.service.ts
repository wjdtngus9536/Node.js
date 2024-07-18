import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        const encryptedPassword = hashSync(userDto.password, 10); // 암호화 처리 10회

        try {
            const user = await this.userService.createUser( {...userDto, password: encryptedPassword} ); // 깊은 복사를 나중에 하면 password까지 덮어씌워짐
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async validateUser(email: string, password: string) {
        const user = await this.userService.getUser(email);
        console.log(user)
        if (!user) {
            return null;
        }

        const {password: hashedPassword, ...userInfo} = user;
        if (compareSync(password, hashedPassword)) {
            return userInfo;
        }
        return null;
    }
}
