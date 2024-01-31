import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateMovieDto, StorageObjectDto } from './dto/movie.dto';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { exit } from 'process';

@Injectable()
export class MovieService {
  constructor(private cloudinaryService: CloudinaryService) {}

  prisma = new PrismaClient();
  async getBannerList(): Promise<any> {
    return await this.prisma.banner.findMany();
  }

  async getMovieList(key: string): Promise<any> {
    let movieName = key;
    if (movieName === '{key}' || movieName === ',') {
      let data = await this.prisma.phim.findMany({});
      return data;
    } else {
      let data = await this.prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: movieName,
          },
        },
      });
      if (data.length === 0) {
        return 'không tìm thấy tên phim!!!';
      }
      return data;
    }
  }

  async getMovieListPagination(
    skip: number,
    numSize: number,
    key: string,
  ): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let movieName = key;

    if (movieName === '{key}' || movieName === ',') {
      let data = await this.prisma.phim.findMany({});
      return data;
    } else {
      let data = await this.prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: movieName,
          },
        },
        skip: skip,
        take: numSize,
      });
      if (data.length === 0) {
        return 'không tìm thấy tên phim!!!';
      }
      return data;
      // return `This action returns all user`;
    }
  }
  async getMovieListByDay(
    skip: number,
    numSize: number,

    minDate: Date,
    maxDate: Date,
    key: string,
  ): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let movieName = key;
    if (movieName === '{key}' || movieName === ',') {
      let data = await this.prisma.phim.findMany({});
      return data;
    } else {
      let data = await this.prisma.phim.findMany({
        where: {
          ten_phim: {
            contains: movieName,
          },
          ngay_khoi_chieu: {
            gte: minDate,
            lt: maxDate,
          },
        },
        skip: skip,
        take: numSize,
      });
      if (data.length === 0) {
        return 'không tìm thấy tên phim!!!';
      }
      return data;
    }
    // return `This action returns all user`;
  }
  async deleteMovie(id: number): Promise<any> {
    const item = await this.prisma.phim.findUnique({
      where: {
        ma_phim: +id,
      },
    });
    if (!item) {
      throw new NotFoundException(`không tìm thấy mã phim: ${id} `);
    }
    await this.prisma.phim.delete({
      where: {
        ma_phim: +id,
      },
    });
    return 'xoá thành công';
  }
  async getMovieInfo(maPhim: number): Promise<any | null> {
    try {
      const data = await this.prisma.phim.findUnique({
        where: {
          ma_phim: +maPhim,
        },
      });
      if (!data) {
        return 'mã phim không tồn tại';
      }
      return data;
    } catch (error) {
      console.error('Error while retrieving movie information:', error);
      throw new Error('An error occurred while retrieving movie information');
    }
  }

  async createMovie(data: StorageObjectDto, file): Promise<any> {
    try {
      const exitingMovie = await this.prisma.phim.findUnique({
        where: {
          ma_phim: +data.ma_phim,
        },
      });
      if (exitingMovie) {
        return {
          status: 409,
          message: 'Mã phim đã tồn tại',
        };
      }
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      await this.prisma.phim.create({
        data: {
          ma_phim: +data.ma_phim,
          ten_phim: data.ten_phim,
          trailer: data.trailer,
          hinh_anh: imageUrl.url,
          mo_ta: data.mo_ta,
          ngay_khoi_chieu: new Date(data.ngay_khoi_chieu),
          danh_gia: +data.danh_gia,
          hot: Boolean(data.hot),
          dang_chieu: Boolean(data.dang_chieu),
          sap_chieu: Boolean(data.sap_chieu),
        },
      });
      return {
        status: 201,
        data: 'Tạo phim thành công',
      };
    } catch (error) {
      console.error('Error creating movie:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
  async updateMovie(data: StorageObjectDto, file): Promise<any> {
    try {
      const exitingMovie = await this.prisma.phim.findUnique({
        where: {
          ma_phim: +data.ma_phim,
        },
      });
      if (!exitingMovie) {
        return {
          status: 404,
          message: 'Mã phim không tồn tại',
        };
      }
      let imageUrl = exitingMovie.hinh_anh;
      if (file) {
        const cloudinaryResponse =
          await this.cloudinaryService.uploadImage(file);
        imageUrl = cloudinaryResponse.url;
      }

      await this.prisma.phim.update({
        where: {
          ma_phim: +data.ma_phim,
        },
        data: {
          ma_phim: +data.ma_phim,
          ten_phim: data.ten_phim ? data.ten_phim : exitingMovie.ten_phim,
          trailer: data.trailer ? data.trailer : exitingMovie.trailer,
          hinh_anh: imageUrl ? imageUrl : exitingMovie.hinh_anh,
          mo_ta: data.mo_ta ? data.mo_ta : exitingMovie.mo_ta,
          ngay_khoi_chieu: data.ngay_khoi_chieu
            ? new Date(data.ngay_khoi_chieu)
            : exitingMovie.ngay_khoi_chieu,
          danh_gia: data.danh_gia ? +data.danh_gia : exitingMovie.danh_gia,
          hot: data.hot ? Boolean(data.hot) : exitingMovie.hot,
          dang_chieu: data.dang_chieu
            ? Boolean(data.dang_chieu)
            : exitingMovie.dang_chieu,
          sap_chieu: data.sap_chieu
            ? Boolean(data.sap_chieu)
            : exitingMovie.sap_chieu,
        },
      });

      return {
        status: 200,
        data: 'Cập nhật phim thành công',
      };
    } catch (error) {
      console.error('Error creating movie:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
}
