import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards,Headers, Req} from '@nestjs/common';
import { BookingService } from './booking.service';
import { lich_chieu } from '@prisma/client';
import {  BookingTicketDTO, CreateShowTimesDTO } from './dto/booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("QuanLyDatVe")

@Controller('QuanLyDatVe')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post("DatVe")
    @ApiBody({description:"thong tin dat ve",type:BookingTicketDTO})
    bookingTicket(@Body() body: BookingTicketDTO,@Req() req): Promise<{ success: boolean; message: string }> {
      return this.bookingService.bookingTicket(body,req);
    }


    @Get('LayDanhSachPhongVe/:ma_lich_chieu')
    @ApiParam({name:"ma_lich_chieu",required:false,description:" mã lịch chiếu"})
    findOne(@Param('ma_lich_chieu', ParseIntPipe) ma_lich_chieu: number): Promise<lich_chieu> {
        return this.bookingService.findOne(ma_lich_chieu);
      }
  
    @Post("TaoLichChieu")
    @ApiBody({description:"tạo lịch chiếu",type:CreateShowTimesDTO})
  createShowTime(@Body() body: CreateShowTimesDTO):Promise <string> {
   console.log("create user api =>",body)
   return this.bookingService.createShowTime(body)
  }
}
