import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ // sqlite 설정 메서드
      type: 'sqlite',       // 1. 데이터베이스의 타입
      database: 'nest-auth-test.sqlite', // 2. 데이터베이스 파일명
      entities: [User],         // 3. 엔티티 리스트
      synchronize: true,    // 4. 데이터베이스에 스키마를 동기화
      logging: true,        // 5. SQL 실행 로그 확인
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
