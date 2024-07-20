import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}


    createUser(user): Promise<User> {
        return this.userRepository.save(user);
    }

    async getUser(email: string) {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }

    async findByEmailorSave(email, username, providerId): Promise<User> {
        const foundUser = await this.getUser(email);
        if (foundUser) {
            return foundUser;
        }

        const newUser = await this.userRepository.save({email, username, providerId});
        return newUser;
    }
}
