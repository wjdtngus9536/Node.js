import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 루트 모듈에서 TypeOrmModule을 구성하여 데이터베이스 연결을 설정
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'nest-auth-review.sqlite',
      entities:[User],
      // synchronize: true, // 꼭 개발용으로만 사용, 프로덕션 서버에서 사용하면 서버 기동 시 의도치 않게 데이터베이스 스키마를 변경할 수도 있기 때문
      logging: true, // SQL 실행로그 확인용 >> 어디서 확인하는지 비교
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
