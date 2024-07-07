import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 1) Repositoey 의존성 주입, 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; // 2) typeorm의 Repository : 저장, 읽기 같은 기본적인 메서드들을 제공

@Injectable()
export class UserService {
    constructor(
        // 3) 리포지토리 주입
        @InjectRepository(User) // User 타입의 리포지토리를 주입한다고 알려줌
        private userRepository: Repository<User> // 변수 선언, 타입은 Repository<User>
    ) {}
}
