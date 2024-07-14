import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm'; // 리포지토리 임포트
import { InjectRepository } from '@nestjs/typeorm'; // 리포지토리 주입 데코레이터
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) // User 타입의 리포지토리를 주입한다고 알려줌
        private userRepository: Repository<User>, // Entity 객체 타입을 넣어서 사용
    ){}

    
    // 유저 생성
    createUser(user) {
        return this.userRepository.save(user);
    }


    // 한 명의 유저 정보 찾기
    async getUser(email: string) : Promise<User> {
        const result =  await this.userRepository.findOne({where: {email}});
        return result
    }

    // 유저 정보 업데이트. username과 pw만 변경
    async updateUser(email, _user) {
        const user: User = await this.getUser(email);

        // console.log(_user);
        user.username = _user.username;
        user.pw = _user.pw;

        // console.log(user);
        return this.userRepository.save(user);
    }

    // 유저 정보 삭제
    deleteUser(email) {
        return this.userRepository.delete({email}); // {email} === {email: email}
    }
}
