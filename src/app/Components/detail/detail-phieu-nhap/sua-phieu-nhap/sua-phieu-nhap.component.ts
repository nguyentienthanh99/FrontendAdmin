import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BanhService } from 'src/app/API/GetAPI/Banh/banh.service';
import { HoaDonNhapService } from 'src/app/API/GetAPI/HoaDonNhap/hoa-don-nhap.service';
import { LoaiBanhService } from 'src/app/API/GetAPI/LoaiBanh/loai-banh.service';
import { NhaCungCapService } from 'src/app/API/GetAPI/NhaCungCap/nha-cung-cap.service';
import { CTPN } from 'src/app/data/modal/CTPN';
import { KichThuoc, KichThuocBanh } from 'src/app/data/modal/KichThuoc';
import { mabanhmax } from 'src/app/data/modal/MaBanhMax';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';
import { Product } from 'src/app/data/modal/product';
import { TypeProduct } from 'src/app/data/modal/type-product';

@Component({
  selector: 'app-sua-phieu-nhap',
  templateUrl: './sua-phieu-nhap.component.html',
  styleUrls: ['./sua-phieu-nhap.component.scss'],
  providers: [Product,KichThuocBanh,CTPN,LoaiBanhService,NhaCungCapService,HoaDonNhapService,mabanhmax],
})
export class SuaPhieuNhapComponent implements OnInit {
  id: any;
  checBanhMoi: boolean = false;
  checkBanhCu: boolean = false;
  disableTTBanh: boolean = false;
  checkKT: boolean = false;
  checkKTBanhCu: boolean = false;
  ListLoaiBanh: TypeProduct[] = [];
  KTs: KichThuoc[] = [];
  ListBanh: Product[] = [];
  MaLoaiBanhev: any;
  Banhev: any;
  images: any;
  CheckAnh: any;
  MaBanhMax: any;
  MaKTBanhMax: any;
  KichThuocev: any;
  constructor(
    public Banh: Product,
    public MaBanhM: mabanhmax,
    public MaKTBanh: mabanhmax,
    public KichThuocBanhMoi: KichThuocBanh,
    public CTPNMoi: CTPN,
    public LoaiBanhs: LoaiBanhService,
    public Banhs: BanhService,
    public HDN: HoaDonNhapService,
    public http: HttpClient,
    public routeAC: ActivatedRoute,    
  ) {
    this.id = this.routeAC.snapshot.queryParamMap.get('id');
    this.getListbanh();
    this.getListLoaiBanh();
    this.getListKT();
   }

  ngOnInit(): void {
  }

  addImg(ev : any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/Upload/" + this.images.name;
    }
  }

  getListLoaiBanh(){
    this.LoaiBanhs.getLoaiBanh().subscribe(result => {
      this.ListLoaiBanh = result;
    });
  }

  getListbanh(){
    this.Banhs.getBanh().subscribe(result => {
      this.ListBanh = result;
    });
  }

  getListKT(){
    this.HDN.getListKichThuoc().subscribe(result => {
      this.KTs = result;
    });
  }

  themBanhMoi(TenBanh: any,MaLoaiBanhev: any,AnhSP: any,HinhDang: any,MoTa: any){
    console.log(TenBanh,MaLoaiBanhev,AnhSP,HinhDang,MoTa);
    const conf = window.confirm("Bạn muốn thêm không ?");
    if(conf){
      const formData = new FormData();
      formData.append('file', this.images);
      this.http.post<any>('http://localhost:3000/file', formData).subscribe(
        (res) => console.log(res),
      );
      if(this.CheckAnh == undefined){
        this.CheckAnh = AnhSP;
      }
      this.HDN.getMaBanhMax().subscribe(result => {
        this.MaBanhM = result;
        this.MaBanhMax = Number(this.MaBanhM.MaBanhMax) + 1;
          this.HDN.themBanhMoi(this.MaBanhMax,TenBanh,MaLoaiBanhev,this.CheckAnh,HinhDang,MoTa,this.Banh).subscribe(result => {
            this.Banh = result;
            this.checkKT = true;
            this.disableTTBanh = true;
          });
      });
    }
  }

  themKichThuocBanhMoi(DonGiaNhap: any,DonGiaBan: any,NSX: any,HSD: any,SL: any,GhiChu: any){
    const conf = window.confirm("Bạn muốn thêm kích thước bánh mới cho bánh " + this.MaBanhMax + " ?");
    if(conf){
      this.HDN.getMaKT_BanhMax().subscribe(result => {
        this.MaKTBanh = result;
        this.MaKTBanhMax = Number(this.MaKTBanh.MaKT_Banh)+1;
        this.HDN.ThemKichThuocBanh(this.MaKTBanhMax,this.MaBanhMax,this.KichThuocev,DonGiaNhap,DonGiaBan,this.KichThuocBanhMoi).subscribe(result => {
          this.KichThuocBanhMoi = result;
          this.HDN.ThemCTPN(this.id,this.MaKTBanhMax,NSX,HSD,SL,GhiChu,this.CTPNMoi).subscribe(result => {
            this.CTPNMoi = result;
          });
        });
      });
    }
  }

  themKichThuocBanhCu(DonGiaNhap: any,DonGiaBan: any,NSX: any,HSD: any,SL: any,GhiChu: any){
    const conf = window.confirm("Bạn muốn thêm kích thước bánh mới cho bánh " + this.Banhev + " ?");
    if(conf){
      this.HDN.getMaKT_BanhMax().subscribe(result => {
        this.MaKTBanh = result;
        this.MaKTBanhMax = Number(this.MaKTBanh.MaKT_Banh)+1;
        this.HDN.ThemKichThuocBanh(this.MaKTBanhMax,this.Banhev,this.KichThuocev,DonGiaNhap,DonGiaBan,this.KichThuocBanhMoi).subscribe(result => {
          this.KichThuocBanhMoi = result;
          this.HDN.ThemCTPN(this.id,this.MaKTBanhMax,NSX,HSD,SL,GhiChu,this.CTPNMoi).subscribe(result => {
            this.CTPNMoi = result;
          });
        });
      });
    }
  }

  ThemBanhKhac(){
    this.checkKT = false;
    this.disableTTBanh = false;
  }

  changeClientPhuongThuc(ev : any){
    if(ev == 1){
      this.checBanhMoi = true;
      this.checkBanhCu = false;
      this.checkKTBanhCu = false;
      this.disableTTBanh = false;
    }
    if(ev == 2){
      this.checBanhMoi = false;
      this.checkBanhCu = true;
      this.checkKT = false;
    }
  }

  changeClient(ev : any){
    this.MaLoaiBanhev = ev;
  }

  changeClientKT(ev : any){
    this.KichThuocev = ev;
  }

  changeClientListBanh(ev: any){
    this.Banhev = ev;
    if(this.Banhev != null){
      this.checkKTBanhCu = true;
    }
  }

}
