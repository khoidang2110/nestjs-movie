import {  ApiProperty} from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
    ma_phim: number;
    ten_phim: string;
    trailer: string;
    hinh_anh: string;
    mo_ta: string;
    ngay_khoi_chieu: Date;
    danh_gia:number;
    hot:boolean;
    dang_chieu:boolean;
    sap_chieu:boolean;
  }
  export class StorageObjectDto {
    @ApiProperty({ required: false })
    ma_phim: number;
    @ApiProperty({ required: false })
    ten_phim: string;
    @ApiProperty({ required: false })
    trailer: string;
  
    @ApiProperty({ required: false })
    mo_ta: string;
    @ApiProperty({ required: false })
    ngay_khoi_chieu: Date;
    @ApiProperty({ required: false })
    danh_gia:number;
    @ApiProperty({ required: false })
    hot:boolean;
    @ApiProperty({ required: false })
    dang_chieu:boolean;
    @ApiProperty({ required: false })
    sap_chieu:boolean;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    file: Express.Multer.File
}