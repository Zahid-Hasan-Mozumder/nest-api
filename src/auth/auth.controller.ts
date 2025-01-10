import { Body, Controller, ParseIntPipe, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User, Bookmark } from "@prisma/client";
import { SigninDto, SignupDto } from "./dto";


@Controller('api/auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto : SigninDto) {
        return this.authService.signin(dto)
    }
}