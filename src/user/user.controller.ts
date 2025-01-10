import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api/users')
export class UserController {

    constructor(private userService : UserService) {}

    @Get('me')
    getMe(@Req() req : any) {
        return this.userService.getMe(req);
    }

    @Patch('edit')
    updateMe(@Req() req : any) {
        return this.userService.updateMe(req);
    }
}
