import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    
    constructor(
        private config : ConfigService,
        private prisma : PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('SECRET_KEY')
        });
    }
    
    async validate(payload : any) {
        const user = await this.prisma.user.findUnique({
            where: {
                id : payload.sub
            }
        })
        delete user.password
        return user
    }
}