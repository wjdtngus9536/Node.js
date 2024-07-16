import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import session = require('express-session');  // ★
import passport = require('passport');        // ★
// import * as passport from 'passport';
// import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(
    session({
      secret: '25-xhdtls', // 1) 세션 암호화에 사용하는 키
      resave: false, // 2) HTTP 요청이 올 때마다 세션을 항상 저장할지 여부
      saveUninitialized: false, // 3) 인증이 되지 않은 사용자 정보도 초기화하지 않은 상태로 세션을 미리 만들어 저장
      cookie: { maxAge: 1000 * 5 }
    })
  );
  app.use(passport.initialize()); // 패스포트
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
