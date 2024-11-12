import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("QuanLyRap")
@Controller('QuanLyRap')
export class TheaterController {
    constructor(private theaterService: TheaterService) {}
    @Get('/LayThongTinHeThongRap/:maRap')
    @ApiParam({name:"maRap",required:true,description:"mã rạp"})
    getMovieInfo(@Param('maRap') maRap): Promise<any> {
      return this.theaterService.getTheaterInfo(maRap);
    }

    @Get('/LayThongTinCumRapTheoHeThong/:maHeThongRap')
    @ApiParam({name:"maHeThongRap",required:true,description:"mã hệ thống rạp"})
    getMovieInfoByBranch(@Param('maHeThongRap') ma_he_thong_rap): Promise<any> {
      return this.theaterService.getTheaterInfoByBranch(ma_he_thong_rap);
    }
    @Get('/LayThongTinLichChieuHeThongRap/:maHeThongRap')
    @ApiParam({name:"maHeThongRap",required:true,description:"mã hệ thống rạp"})
    getShowTimeByBranch(@Param('maHeThongRap') ma_he_thong_rap): Promise<any> {
      return this.theaterService.getShowTimeByBranch(ma_he_thong_rap);
    }
    @Get('/LayThongTinLichChieuPhim/:maPhim')
    @ApiParam({name:"maPhim",required:true,description:"mã phim"})
    getShowTimeByMovieId(@Param('maPhim') maPhim): Promise<any> {
      return this.theaterService.getShowTimeByMovieId(maPhim);
    }
}
