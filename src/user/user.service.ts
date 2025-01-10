import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma : PrismaService) {}
    
    async getMe(req : any){
        const user = await this.prisma.user.findUnique({
            where: {
                id : req.user.userId
            }
        })
        delete user.password;
        return user;
    }

    async updateMe(req : any) {
        const user = await this.prisma.user.update({
            where : {
                id : req.user.userId
            },
            data : {
                firstName : req.body.firstName,
                lastName : req.body.lastName
            }
        })
        delete user.password;
        return user;
    }
}
