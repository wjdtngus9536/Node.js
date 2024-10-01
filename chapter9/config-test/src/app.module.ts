import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ConfigModule은 보통 app.module.ts에서 해당 코드 실행
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
// 커스텀 파일 설정을 하려면 load 옵션을 추가해야함
import config from './configs/config';

console.log('env : ' + process.env.NODE_ENV);
console.log(`${process.cwd()}/envs/${process.env.NODE_ENV}.env`);

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    load: [config],
  }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
