import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import loginDTO from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService:ConfigService
      ){
    
      }
    
      prisma = new PrismaClient();
      async login(body: loginDTO): Promise<any> {
        let {email,mat_khau} = body;
        //B1: kiểm tra email có tồn tại trong DB hay không
        let checkUser = await this.prisma.nguoi_dung.findFirst({
          where:{
            email:email
          }
        })
        if(checkUser){
          // nếu user tồn tại trong DB => check password ( bcrypt)
          // npm i bcrypt @types/bcrypt
          //ss 2 pass 
          let isCorrectPass = bcrypt.compareSync(mat_khau,checkUser.mat_khau);
          if(isCorrectPass){
            let payload = {
              tai_khoan: checkUser.tai_khoan,
              ho_ten:checkUser.ho_ten,
              email: checkUser.email,
              so_dt:checkUser.so_dt,
              mat_khau:checkUser.mat_khau,
              loai_nguoi_dung:checkUser.loai_nguoi_dung
            }
            // nếu password matching => tạo token 
            let token = this.jwtService.sign(payload,{
              secret:this.configService.get("SECRET_KEY"),
            expiresIn:this.configService.get("EXPIRES_IN"),
            })
            return token;
            //nếu không => raise lỗi
          }
          return "password incorrect "
        }
    
        return "User is not exist"
      }
    //   signUp() {
    //     return 'signUp';
    //   }
}
