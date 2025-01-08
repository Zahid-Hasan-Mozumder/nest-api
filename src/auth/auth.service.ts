import { Injectable } from "@nestjs/common";
import { SigninDto, SignupDto } from "../dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    
    constructor(private prisma : PrismaService) {}
    
    async signup(dto : SignupDto) {
        const hashedPassword = await argon.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                firstName : dto.firstName,
                lastName : dto.lastName,
                email : dto.email,
                password : hashedPassword
            }
        })
        delete user.password
        return this.prisma.signup()
    }

    signin(dto : SigninDto) {
        return this.prisma.signin()
    }
    
}