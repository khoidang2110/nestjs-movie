import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import loginDTO from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("QuanLyNguoiDung")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
//@ApiBody({type:loginDTO})
login(@Body() body:loginDTO): Promise <any> {

  return this.authService.login(body);
}

}
