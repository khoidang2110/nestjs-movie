import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserTypesDto } from './dto/user.dto';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private configService:ConfigService
  ){

  }
  prisma = new PrismaClient();

  async create(body: CreateUserDto): Promise<any> {
    try {
      const exitingUser = await this.prisma.nguoi_dung.findUnique({
        where: {
          tai_khoan: body.tai_khoan,
        },
      });
      if (exitingUser) {
        return {
          status: 409,
          message: 'User already exists',
        };
      }
      const hashedPassword = await bcrypt.hash(body.mat_khau, 10);

      await this.prisma.nguoi_dung.create({
        data: {
          ...body,
          mat_khau:hashedPassword,
        }
      });
      return {
        status: 201,
        data: 'Đăng ký thành công',
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }

  async getUserType(): Promise<UserTypesDto[]> {
    const users = await this.prisma.nguoi_dung.findMany({
      select: {
        loai_nguoi_dung: true,
      },
    });

    if (!users || users.length === 0) {
      // Handle the case where no users are found, depending on your requirements
      return [];
    }

    const uniqueUserTypesSet = new Set<string>();
    const userDtos: UserTypesDto[] = [];

    for (const user of users) {
      if (uniqueUserTypesSet.size >= 2) {
        break; // Break if we have already found two distinct user types
      }

      if (!uniqueUserTypesSet.has(user.loai_nguoi_dung)) {
        let ten_loai = '';

        // Assign userTypeName based on user type
        if (user.loai_nguoi_dung === 'KhachHang') {
          ten_loai = 'Khách Hàng';
        } else if (user.loai_nguoi_dung === 'QuanTri') {
          ten_loai = 'Quản Trị';
        }

        const userDto: UserTypesDto = {
          ma_loai_nguoi_dung: user.loai_nguoi_dung,
          ten_loai,
        };

        userDtos.push(userDto);
        uniqueUserTypesSet.add(user.loai_nguoi_dung);
      }
    }

    return userDtos;
  }

  async getListUser(key: string): Promise<any> {
    let userName = key;

    if (userName === '{key}' || userName === ',') {
      //userName=" "
      let data = await this.prisma.nguoi_dung.findMany({});
      return data;
    } else {
      let data = await this.prisma.nguoi_dung.findMany({
        where: {
          ho_ten: {
            contains: userName,
          },
        },
      });
      if (data.length === 0) {
        return 'keyword do not match!!!';
      }
      return data;
    }
  }

  async getListUserPagination(
    skip: number,
    numSize: number,
    key: string,
  ): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let userName = key;
    if (userName === '{key}' || userName === ',') {
      //userName=" "
      let data = await this.prisma.nguoi_dung.findMany({});
      return data;
    } else {
      let data = await this.prisma.nguoi_dung.findMany({
        where: {
          ho_ten: {
            contains: userName,
          },
        },
        skip: skip,
        take: numSize,
      });
      if (data.length === 0) {
        return 'keyword do not match!!!';
      }
      return data;
    }
  }

  async updateUser(body: UpdateUserDto): Promise<any> {
    try {
      const existingUser = await this.prisma.nguoi_dung.findUnique({
        where: {
          tai_khoan: body.tai_khoan,
        },
      });

      if (!existingUser) {
        return {
          status: 404, // Not Found status code for user not found
          message: 'User not found',
        };
      }
      //const hashedPassword = await bcrypt.hash(body.mat_khau, 10);
let hashedPassword='';
if(body.mat_khau){
  hashedPassword = await bcrypt.hash(body.mat_khau, 10);
}


      const updatedUser =  await this.prisma.nguoi_dung.update({
        where: {
          tai_khoan: body.tai_khoan,
        },
        data: {
          ho_ten: body.ho_ten ? body.ho_ten : existingUser.ho_ten,
          email: body.email ? body.email : existingUser.email,
          so_dt: body.so_dt ? body.so_dt : existingUser.so_dt,
          mat_khau:body.mat_khau ? hashedPassword : existingUser.mat_khau,
          loai_nguoi_dung: body.loai_nguoi_dung ? body.loai_nguoi_dung :existingUser.loai_nguoi_dung,
        },
      });

      let payload = {
        tai_khoan: updatedUser.tai_khoan,
        ho_ten: updatedUser.ho_ten,
        email: updatedUser.email,
        so_dt: updatedUser.so_dt,
        mat_khau:updatedUser.mat_khau,
        loai_nguoi_dung: updatedUser.loai_nguoi_dung,
      }

      let token = this.jwtService.sign(payload,{
        secret:this.configService.get("SECRET_KEY"),
      expiresIn:this.configService.get("EXPIRES_IN"),
      })
      
      return {
        status: 200,
        message: 'Update successful',
        token: token
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  }
  async deleteUser(id: number): Promise<any> {
    const item = await this.prisma.nguoi_dung.findUnique({
      where: {
        tai_khoan: +id,
      },
    });
    if (!item) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.prisma.nguoi_dung.delete({
      where: {
        tai_khoan: +id,
      },
    });
    return 'delete successful';
  }
  async getUserInfo(req: any): Promise<any> {
    try {
      const reqUser = req.user;
      if (reqUser) {
        const userInfo = {
          tai_khoan: reqUser.user_id,
          email: reqUser.email,
          loai_nguoi_dung: reqUser.role,
        };
        const bookingInfo = await this.prisma.dat_ve.findMany({
          where: {
            tai_khoan: +reqUser.user_id,
          },
          include: {
            ghe: true,
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

        return {
          ...userInfo,
          bookingInfo,
        };
      }
    } catch (error) {
      console.error('Error while retrieving user information:', error);
      throw new Error('An error occurred while retrieving user information');
    }
  }
}
