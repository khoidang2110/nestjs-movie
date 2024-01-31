import exp from "constants";

export class CreateShowTimesDTO {
  ma_lich_chieu:number;
  ma_rap: number;
  ma_phim: number;
  ngay_gio_chieu: Date;
  gia_ve: number;
 
}
// export class BookingTicketDTO {
//   ma_lich_chieu: number;
//   tai_khoan: number;
//   ma_ghe: number;

// }

export class BookingTicketDTO {
  tai_khoan:number;
  ma_lich_chieu: number;
  danh_sach_ve: VeItem[];

}

export class VeItem {
  ma_ghe: number;

}




