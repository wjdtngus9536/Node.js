import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프에 validationPipe 객체 추가
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-important-secret',
      resave: false,
      saveUninitialized: false, // 세션을 저장되기 전에 빈 값을 저장할지 여부, true시 인증이 되지 않은 사용자 정보도 빈 값으로 저장함
      cookie: { maxAge: 1000 * 60 * 10 }, // 쿠키 유효기간 1시간, 세션을 찾는 데 사용할 키값을 쿠키에 설정. 
    }),
  );
  
  // passport 초기화 및 세션 저장소 초기화, 세션의 저장소를 따로 지정하지 않았으므로 서버의 메모리에 저장됩니다.
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
