import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UserDto {
    
    @ApiProperty({ description : "First name of the user", required : false})
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    firstName : string;
    
    @ApiProperty({ description : "Last name of the user", required : false})
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    lastName : string;
}