import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { hashSync, compareSync } from 'bcrypt';
// import { CreateUserDto } from 'src/user/user.dto'; ★

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


    // 쿠키에 데이터를 추가하기 전에 유저의 데이터가 맞는지 검증하는 로직 필요
    async validateUser(email: string, pw: string) {
        // 서버에 해당 유저 데이터 존재 여부 확인
        const user = await this.userService.getUser(email);
        
        // TypeOrm Repository에 해당 유저 정보 없는 경우 유효하지 않다는 의미의 null 반환
        if (!user) { return null; }

        // 서버에 해당 유저 데이터가 존재하는 경우 비밀번호 확인 후 비밀번호 제외한 유저 정보 반환
        const { pw: hashedPassword, ...userInfo } = user;
        if (compareSync(pw, hashedPassword)) { // pw와 패스워드 해시값을 주면 바르게 암호화 됐으면 true 반환
            return userInfo; // 매개변수로 온 pw와 서버에 저장된 암호화된 비밀번호가 동일한지 비교하여 유저 정보 반환
        } else {
            return null;
        }
    }
}
