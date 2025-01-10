import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Max, MaxLength } from "class-validator";

export class SignupDto {

    @ApiProperty({ description : "First name of the user", required : false })
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    firstName : string;
    
    @ApiProperty({ description : "Last name of the user", required : true })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    lastName : string;
    
    @ApiProperty({ description : "Email of the user", required : true })
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @ApiProperty({ description : "Password of the user", required : true })
    @IsString()
    @IsNotEmpty()
    password : string;
}

export class SigninDto {

    @ApiProperty({ description : "Email of the user", required : true })
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @ApiProperty({ description : "Password of the user", required : true })
    @IsString()
    @IsNotEmpty()
    password : string;
}