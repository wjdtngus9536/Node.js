import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(user: any): Promise<User>;
    getUser(email: string): Promise<User>;
    updateUser(email: any, _user: any): Promise<void>;
    deleteUser(email: any): Promise<import("typeorm").DeleteResult>;
}
