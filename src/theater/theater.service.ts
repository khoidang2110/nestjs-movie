import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TheaterService {
  prisma = new PrismaClient();
  async getTheaterInfo(maRap: number): Promise<any | null> {
    try {
      const data = await this.prisma.rap_phim.findUnique({
        where: {
          ma_rap: +maRap,
        },
      });
      if(!data){
        return "mã rạp không tồn tại"
      }
      return data;
    } catch (error) {
      console.error('Error while retrieving movie information:', error);
      throw new Error('An error occurred while retrieving movie information');
    }
  }
  async getTheaterInfoByBranch(ma_he_thong_rap: number): Promise<any | null> {
    try {
      const data = await this.prisma.cum_rap.findMany({
        where: {
          ma_he_thong_rap: +ma_he_thong_rap,
        },
        include: {
          he_thong_rap: true,
          rap_phim: {
            select: {
              ma_rap: true,
              ten_rap: true,
            },
          },
        },
      });
      if(data.length==0){
        return "mã hệ thống rạp không tồn tại"
      }
      return data;
    } catch (error) {
      console.error('Error while retrieving movie information:', error);
      throw new Error('An error occurred while retrieving movie information');
    }
  }
  async getShowTimeByBranch(ma_he_thong_rap: number): Promise<any | null> {
    try {
      const data = await this.prisma.cum_rap.findMany({
        where: {
          ma_he_thong_rap: +ma_he_thong_rap,
        },
        include: {
          rap_phim: {
            include: {
              lich_chieu: {
                include: {
                  phim: true,
                },
              },
            },
          },
        },
      });
      console.log("data lenght",data.length)
      if(data.length==0){
        return "mã hệ thống rạp không tồn tại"
      }
      return data;
    } catch (error) {
      console.error('Error while retrieving movie information:', error);
      throw new Error('An error occurred while retrieving movie information');
    }
  }
  async getShowTimeByMovieId(maPhim: number): Promise<any | null> {
    try {
      const data = await this.prisma.phim.findUnique({
        where: {
          ma_phim: +maPhim,
        },
        include: {
          lich_chieu: {
            include: {
              rap_phim: {
                include: {
                  cum_rap: {
                    include: {
                      he_thong_rap: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if(!data){
        return "mã phim không tồn tại"
      }
      return data;
    } catch (error) {
      console.error('Error while retrieving movie information:', error);
      throw new Error('An error occurred while retrieving movie information');
    }
  }
}
