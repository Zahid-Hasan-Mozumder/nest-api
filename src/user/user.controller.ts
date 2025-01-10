import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/users')
export class UserController {

    constructor(private userService : UserService) {}

    @Get('me')
    getMe(@GetUser() user : any) {
        return this.userService.getMe(user);
    }

    @Patch('me')
    updateMe(@GetUser() user : any, @Body() dto : UserDto) {
        return this.userService.updateMe(user, dto);
    }
}
