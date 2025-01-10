import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class BookmarkService {

    constructor(private prisma : PrismaService) {}

    async createBookmark(user : any, dto : CreateDto) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                userId : user.id,
                link : dto.link
            }
        });

        if(bookmark){
            throw new ConflictException("This link is already bookmarked");
        }

        const newBookmark = await this.prisma.bookmark.create({
            data : {
                title : dto.title,
                description : dto.description,
                link : dto.link,
                userId : user.id
            }
        })

        return newBookmark;
    }

    async getAllBookmarks(user : any) {
        const allBookmarks = await this.prisma.bookmark.findMany({
            where: {
                userId : user.id
            }
        })
        return allBookmarks;
    }

    async getBookmarkById(user : any, id : number){
        const bookmark = await this.prisma.bookmark.findUnique({
            where : {
                id : id,
                userId : user.id
            }
        })

        if(!bookmark){
            throw new NotFoundException("Bookmark not found");
        }

        return bookmark;
    }

    async updateBookmarkById(user : any, id : number, dto : UpdateDto){
        const bookmark = await this.prisma.bookmark.findUnique({
            where : {
                id : id,
                userId : user.id
            }
        })

        if(!bookmark){
            throw new NotFoundException("Bookmark not found");
        }

        const updatedBookmark = await this.prisma.bookmark.update({
            where : {
                id : id,
                userId : user.id
            },
            data : {
                title : dto.title,
                description : dto.description,
                link : dto.link
            }
        })

        return updatedBookmark;
    }

    async deleteBookmarkById(user : any, id : number){
        const bookmark = await this.prisma.bookmark.findUnique({
            where : {
                id : id,
                userId : user.id
            }
        })

        if(!bookmark){
            throw new NotFoundException("Bookmark not found");
        }

       await this.prisma.bookmark.delete({
            where : {
                id : id,
                userId : user.id
            }
        })

        return "Bookmark deleted successfully";
    }
}
