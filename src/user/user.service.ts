import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {

    constructor(private prisma : PrismaService) {}
    
    async getMe(user : any){
        const foundUser = await this.prisma.user.findUnique({
            where: {
                id : user.id
            }
        })
        delete foundUser.password;
        return foundUser;
    }

    async updateMe(user : any, dto : UserDto) {
        const updatedUser = await this.prisma.user.update({
            where : {
                id : user.id
            },
            data : {
                firstName : dto.firstName,
                lastName : dto.lastName
            }
        })
        delete updatedUser.password;
        return updatedUser;
    }
}
