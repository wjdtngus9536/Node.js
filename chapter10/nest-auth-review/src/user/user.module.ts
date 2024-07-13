import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  // TypeOrmModule.forFeature([entity])모듈 내의 특정 엔티티에 대한 저장소를 등록하고 구성, 이를 통해 서비스나 컨트롤러에서 TypeORM 저장소를 사용 가능
  imports: [TypeOrmModule.forFeature([User])], // 서비스에서 사용하는 리포지토리를 모듈에 등록해줘야 서비스에서 리포지토리를 찾을 수 있음
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
