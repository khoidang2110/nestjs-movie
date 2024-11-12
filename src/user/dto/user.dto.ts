export class CreateUserDto {
  tai_khoan: number;
  ho_ten: string;
  email: string;
  so_dt: string;
  mat_khau: string;
  loai_nguoi_dung: string;
}
export class UpdateUserDto {
  tai_khoan: number;
  ho_ten: string;
  email: string;
  so_dt: string;
  mat_khau: string;
  loai_nguoi_dung: string;
}

export class UserTypesDto {
  
   ma_loai_nguoi_dung: string;
 ten_loai: string;
}

export class UserInfoDto {
  tai_khoan: number;
  email:string;
  loai_nguoi_dung:string;
}
