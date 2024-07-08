import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 1) Repositoey 의존성 주입, 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // 2) typeorm의 Repository : 저장, 읽기 같은 기본적인 메서드들을 제공

@Injectable() // 1) 의존성 주입을 위한 데코레이터
export class UserService {
    constructor(
        // 2) 리포지토리 주입
        @InjectRepository(User) private userRepository: Repository<User> // 변수 선언, 타입은 Repository<User>
    ) {}

    // 3) 유저 생성
    createUser(user) : Promise<User> {
        return this.userRepository.save(user);
    }

    // 4) 한 명의 유저 정보 찾기
    async getUser(email: string) {
        const result = await this.userRepository.findOne({
            where: {email},
        });
        return result;
    }

    // 5) 유저 정보 업데이트. username과 password만 변경
    async updateUser(email, _user) {
        const user: User = await this.getUser(email);
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        this.userRepository.save(user);
    }

    // 6) 유저 정보 삭제
    deleteUser(email: any) {
        return this.userRepository.delete({ email });
    }
}
