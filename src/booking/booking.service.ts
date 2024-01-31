import { Injectable } from '@nestjs/common';

import { BookingTicketDTO, CreateShowTimesDTO } from './dto/booking.dto';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Injectable()
export class BookingService {
  constructor(private configService: ConfigService) {}
  prisma = new PrismaClient();
  async findOne(ma_lich_chieu: number): Promise<any> {
    try {
      const data = await this.prisma.lich_chieu.findUnique({
        where: { ma_lich_chieu: ma_lich_chieu },
        include: {
          phim: true,
          rap_phim: {
            include: {
              cum_rap: true,
            },
          },
        },
      });

      if (!data) {
        return {
          status: 404, // Not Found status code
          message: 'Mã lịch chiếu không tồn tại',
        };
      }

      return {
        status: 200, // OK status code
        data: data,
      };
    } catch (error) {
      console.error('Error retrieving cinema screening:', error);
      return {
        status: 500, // Internal Server Error status code
        message: 'Internal Server Error',
      };
    }
  }
  async createShowTime(body: CreateShowTimesDTO): Promise<string> {
    try {
      const existingSchedule = await this.prisma.lich_chieu.findUnique({
        where: {
          ma_lich_chieu: body.ma_lich_chieu,
        },
      });

      if (existingSchedule) {
        return 'Mã lịch chiếu đã tồn tại';
      } else {
        await this.prisma.lich_chieu.create({
          data: {
            ma_lich_chieu: body.ma_lich_chieu,
            ma_rap: body.ma_rap,
            ma_phim: body.ma_phim,
            ngay_gio_chieu: new Date(body.ngay_gio_chieu),
            gia_ve: body.gia_ve,
            // Add other properties if needed
          },
        });

        return 'Tạo lịch chiếu thành công!';
      }
    } catch (error) {
      console.error('Error creating show time:', error);
      return 'Internal Server Error';
    }
  }
  async bookingTicket(
    body: BookingTicketDTO,
    req: any,
  ): Promise<{ success: boolean; message: string }> {
  
    try {
      const reqUser = req.user;
      if (reqUser)  {
        const { ma_lich_chieu, danh_sach_ve } = body;

        // const checkMaLichChieu = await this.prisma.dat_ve.findMany({
        //   where: {
        //     ma_lich_chieu: ma_lich_chieu,
        //   },
        // });

        // if (checkMaLichChieu.length !== 0) {
        //   return { success: false, message: 'Mã lịch chiếu bị trùng' };
        // }

        const seatExistenceChecks = await Promise.all(
          danh_sach_ve.map(async (item) => {
            const datVe = await this.prisma.dat_ve.findMany({
              where: {
                ma_ghe: +item.ma_ghe,
              },
            });

            return datVe;
          }),
        );

        if (seatExistenceChecks.some((datVe) => datVe.length == 1)) {
          return { success: false, message: 'ghế bị đã được đặt' };
        }

        await this.prisma.dat_ve.createMany({
          data: danh_sach_ve.map((item) => ({
            tai_khoan: +reqUser.user_id,
            ma_lich_chieu: +ma_lich_chieu,
            ma_ghe: +item.ma_ghe,
          })),
        });
        return { success: true, message: 'Booking successful!' };
      }
    } catch (error) {
      console.error('Error during booking:', error);
      return { success: false, message: 'Booking failed.' };
    }
  }
}
