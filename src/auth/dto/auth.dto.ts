import { IsEmail, IsNotEmpty, IsOptional, IsString, Max, MaxLength } from "class-validator";

export class SignupDto {
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    firstName : string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
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