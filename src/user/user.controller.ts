import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  ParseIntPipe,
  Param,
  Put,
  Delete,
  UseGuards,
  Headers,
  Res,
  Req,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserInfoDto, UserTypesDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDUsImVtYWlsIjoia2hvaWRhbmdAZ21haWwuY29tIiwicm9sZSI6ImFiYyIsImlhdCI6MTcwNjQ0OTAxMCwiZXhwIjoxODAxMTIxODEwfQ.yKd9436lpys32GwsYoQppXyleqBlJkc6FZ-XQDGauZ4
@ApiTags("QuanLyNguoiDung")
@Controller('QuanLyNguoiDung')
export class UserController {
  constructor(private userService: UserService) {}


  @Get('LayDanhSachLoaiNguoiDung')
 
  getAllUserType(): Promise<UserTypesDto[]> {
    //console.log(req.user);
    const userDtos = this.userService.getUserType();
    return userDtos;
  }
  // DangNhap

  @Post('DangKy')
  @ApiBody({description:"thong tin dang ky",type:CreateUserDto})
  async signUp(@Body() body: CreateUserDto, @Res() response): Promise<any> {
    try {
      let data = await this.userService.create(body);
      response.status(data.status).json(data);
    } catch (error) {
      response.status(500).json({ status: 500, message: error.message });
    }
  }
  @Get('LayThongTinThaiKhoan')
  getUserInfo(@Req() req): Promise<UserInfoDto> {
    const userDtos = this.userService.getUserInfo(req);
    return userDtos;
  }
  @ApiParam({name:"key",required:false,description:"Search"})
  @Get('LayDanhSachNguoiDung/:key')
  getListUser(@Param('key') key): Promise<any> {
    return this.userService.getListUser(key);
  }
  @ApiParam({name:"page",required:false,description:"page number"})
  @ApiParam({name:"size",required:false,description:"item per page"})
  @ApiParam({name:"key",required:false,description:"Search"})
  @Get('LayDanhSachNguoiDungPhanTrang/:page/:size/:key')
  getListUserPagination(
    @Param('key') key,
    @Param('page') page,
    @Param('size') size,
  ): Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.userService.getListUserPagination(skip, numSize, key);
  }
  @Put('CapNhatThongTinNguoiDung')
  @ApiBody({description:"thong tin cap nhat",type:CreateUserDto})
  updateUser(@Body() body: UpdateUserDto,@Req() req): Promise<any> {
    const userDtos = this.userService.updateUser(body,req);
    return userDtos;
  }
  @ApiParam({name:"id",required:false,description:"user id"})
  @Delete('XoaNguoiDung/:id')
  deleteUser(@Param("id") id): Promise <any>{
return this.userService.deleteUser(id);
  }

}
