import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail() // 이메일인지 유효성 검증도 가능하도록
    email: string;

    @IsString() // 주어진 값이 문자열인지 확인
    password: string;

    @IsString()
    username: string;
}

export class UpdateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}