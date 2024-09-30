import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// ConfigModule은 보통 app.module.ts에서 해당 코드 실행
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

console.log('env : ' + process.env.NODE_ENV);

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
