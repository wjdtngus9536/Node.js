import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    pw: string;
    @IsString()
    username: string;
}

export class UpdateUserDto {
    @IsString()
    pw: string;
    @IsString()
    username: string;
}