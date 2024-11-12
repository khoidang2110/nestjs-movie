import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto, StorageObjectDto } from './dto/movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags('QuanLyPhim')
@Controller('QuanLyPhim')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('LayDanhSachBanner')
  getAllUserType(): Promise<any> {
    return this.movieService.getBannerList();
  }

  @Get('/LayDanhSachPhim/:key')
  @ApiParam({ name: 'key', required: false, description: 'tên phim' })
  getMovieList(@Param('key') key): Promise<any> {
    return this.movieService.getMovieList(key);
  }

  @Get('LayDanhSachPhimPhanTrang/:page/:size/:key')
  @ApiParam({ name: 'key', required: false, description: 'tên phim' })
  @ApiParam({ name: 'page', required: true, description: 'trang' })
  @ApiParam({ name: 'size', required: true, description: 'số lượng' })
  getMovieListPagination(
    @Param('key') key,
    @Param('page') page,
    @Param('size') size,
  ): Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.movieService.getMovieListPagination(skip, numSize, key);
  }

  @Get('LayDanhSachPhimTheoNgay/:page/:size/:minDate/:maxDate/:key')
  @ApiParam({ name: 'page', required: true, description: 'trang' })
  @ApiParam({ name: 'size', required: true, description: 'số lượng' })
  @ApiParam({ name: 'minDate', required: true, description: 'từ ngày' })
  @ApiParam({ name: 'maxDate', required: true, description: 'đến ngày' })
  @ApiParam({ name: 'key', required: false, description: 'tên phim' })
  getMovieListByDay(
    @Param('key') key,
    @Param('page') page,
    @Param('size') size,
    @Param('minDate') minDate: Date,
    @Param('maxDate') maxDate: Date,
  ): Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.movieService.getMovieListByDay(
      skip,
      numSize,
      new Date(minDate),
      new Date(maxDate),
      key,
    );
  }
  @Delete('XoaPhim/:id')
  @ApiParam({ name: 'id', required: true, description: 'id phim' })
  deleteMovie(@Param('id') id): Promise<any> {
    return this.movieService.deleteMovie(id);
  }

  @Get('/LayThongTinPhim/:maPhim')
  @ApiParam({ name: 'maPhim', required: true, description: 'id phim' })
  getMovieInfo(@Param('maPhim') maPhim): Promise<any> {
    return this.movieService.getMovieInfo(maPhim);
  }

  @Post('ThemPhimUploadHinh')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  createMovie(
    @Body() data: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<any> {
    const userDtos = this.movieService.createMovie(data, file);
    return userDtos;
  }

  @Put('CapNhatPhimUpload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateMovie(
    @Body() data: StorageObjectDto,
    @UploadedFile('file') file: Express.Multer.File,
  ): Promise<any> {
    const userDtos = this.movieService.updateMovie(data, file);
    return userDtos;
  }
}
