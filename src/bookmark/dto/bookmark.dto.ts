import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreateDto {

    @ApiProperty({ description : "Title of the bookmark", required : true })
    @IsNotEmpty()
    @IsString()
    @Length(1, 1000)
    title : string;
    
    @ApiProperty({ description : "Description of the bookmark", required : false })
    @IsOptional()
    @IsString()
    @MaxLength(10000)
    description : string;

    @ApiProperty({ description : "URL of the bookmark", required : true })
    @IsNotEmpty()
    @IsString()
    link : string;
}

export class UpdateDto extends PartialType(CreateDto) {}