import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Repositoey 의존성 주입
import { User } from './user.entity';
import { Repository } from 'typeorm'; // typeorm의 Repository 저장, 읽기 같은 기본적인 메서드들을 제공

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>
    ) {}
}
