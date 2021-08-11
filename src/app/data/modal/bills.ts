
  export class Bill{
    MaHD: string = '';
    MaKH: string = '';
    TenKH: string = '';
    TrangThaiGiaoHang: boolean = false;
    TrangThaiThanhToan: boolean = false;
    TrangThaiXacThuc: boolean = false;
    NgayTaoHD: Date = new Date();
    SoTienConLai: Number = 0;
    completed: boolean = false;
    GhiChu: string = '';
  }

  export class SoHoaDon{
    SoHoaDon: Number = 0;
  }