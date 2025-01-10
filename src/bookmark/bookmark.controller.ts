import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { CreateDto, UpdateDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('api/bookmarks')
export class BookmarkController {

    constructor(private bookmarkService : BookmarkService) {}

    @Post()
    createBookmark(@GetUser() user : any, @Body() dto : CreateDto) {
        return this.bookmarkService.createBookmark(user, dto);
    }

    @Get()
    getAllBookmarks(@GetUser() user : any) {
        return this.bookmarkService.getAllBookmarks(user);
    }

    @Get(':id')
    getBookmarkById(@GetUser() user : any, @Param('id') id : string){
        return this.bookmarkService.getBookmarkById(user, parseInt(id));
    }

    @Patch(':id')
    updateBookmarkById(@GetUser() user : any, @Param('id') id : string, @Body() dto : UpdateDto){
        return this.bookmarkService.updateBookmarkById(user, parseInt(id), dto);
    }

    @Delete(':id')
    deleteBookmarkById(@GetUser() user : any, @Param('id') id : string){
        return this.bookmarkService.deleteBookmarkById(user, parseInt(id));
    }
}
