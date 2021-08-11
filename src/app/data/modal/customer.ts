

// export interface Customer{
//     ma: string;
//     Ten: string;
//     SDT: string;
//     Email: string;
//     GioiTinh: string,
//     NgaySinh: string,
//     Anh: string,
//     completed: boolean,
//     ThanhPho: string,
//     Quan: string,
//     Phuong: string,
//     DiaChi: string,
//     ListBill: Bills[],
// }

export class Customer{
    MaKH: Number = 0;
    MaTK: Number = 0;
    TenKH: string = '';
    NgaySinh: string = '';
    GioiTinh: string = '';
    SDT: string = '';
    Email: string = '';
    Anh: string = '';
    completed: boolean = false;
    Quan: string = '';
    ThanhPho: string = '';
    Phuong: string = '';
    DiaChi: string = '';
    MatKhau:string = '';
    created_at:Date = new Date();
    updated_at:Date = new Date();
    SoHoaDon: Number = 0;
    // ListBill: Bills[],
  }

  export class Admin{
    MaAD: Number = 0;
    MaTK: Number = 0;
    TenAD: string = '';
    Anh: string = '';
    MatKhau: string = '';
    // ListBill: Bills[],
  }