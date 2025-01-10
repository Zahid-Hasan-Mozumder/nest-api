import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { SigninDto, SignupDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    
    constructor(
        private prisma : PrismaService,
        private jwt : JwtService,
        private config : ConfigService
    ) {}
    
    async signup(dto : SignupDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(user){
            throw new ConflictException("User already exist with this email");
        }

        const hashedPassword = await argon.hash(dto.password)
        const newUser = await this.prisma.user.create({
            data: {
                firstName : dto.firstName,
                lastName : dto.lastName,
                email : dto.email,
                password : hashedPassword
            }
        })
        delete newUser.password
        return newUser;
    }

    async signin(dto : SigninDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email : dto.email
            }
        })

        if(!user){
            throw new ForbiddenException("Credentials incorrect")
        }

        if(!await argon.verify(user.password, dto.password)){
            throw new ForbiddenException("Incorrect password")
        }

        return { 
            access_token : await this.signToken(user.id, user.email) 
        };
    }
    
    async signToken(userId : Number, email : string) : Promise<string> {
        const payload = {
            sub: userId,
            email: email
        }
        const secret = this.config.get('SECRET_KEY')
        const token = await this.jwt.signAsync(
            payload, 
            {
                expiresIn: '15m', 
                secret : secret
            }
        )
        return token;
    }
}