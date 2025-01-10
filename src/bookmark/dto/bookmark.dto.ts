import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 1000)
    title : string;
    
    @IsOptional()
    @IsString()
    @MaxLength(10000)
    description : string;

    @IsNotEmpty()
    @IsString()
    link : string;
}

export class UpdateDto extends PartialType(CreateDto) {}