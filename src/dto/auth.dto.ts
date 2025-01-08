import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignupDto {
    @IsOptional()
    firstName : string;
    
    @IsString()
    @IsNotEmpty()
    lastName : string;
    
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    password : string;
}

export class SigninDto {
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @IsNotEmpty()
    password : string;
}