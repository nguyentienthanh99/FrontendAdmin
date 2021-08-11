import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanhService } from 'src/app/API/GetAPI/Banh/banh.service';
import { HoaDonNhapService } from 'src/app/API/GetAPI/HoaDonNhap/hoa-don-nhap.service';
import { LoaiBanhService } from 'src/app/API/GetAPI/LoaiBanh/loai-banh.service';
import { NhaCungCapService } from 'src/app/API/GetAPI/NhaCungCap/nha-cung-cap.service';
import { CTPN } from 'src/app/data/modal/CTPN';
// import { FileAnh } from 'src/app/data/modal/file';
import { HoaDonNhap } from 'src/app/data/modal/HoaDonNhap';
import { KichThuoc, KichThuocBanh } from 'src/app/data/modal/KichThuoc';
import { admin } from 'src/app/data/modal/login';
import { mabanhmax } from 'src/app/data/modal/MaBanhMax';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';
import { Product } from 'src/app/data/modal/product';
import { TypeProduct } from 'src/app/data/modal/type-product';

@Component({
  selector: 'app-them-hoa-don-nhap',
  templateUrl: './them-hoa-don-nhap.component.html',
  styleUrls: ['./them-hoa-don-nhap.component.scss'],
  providers: [HoaDonNhapService,mabanhmax,Product,HoaDonNhap,BanhService,KichThuocBanh,CTPN],
})
export class ThemHoaDonNhapComponent implements OnInit {
  KichThuoc: any;
  CheckAnh: any;
  MaBanhMax: Number = 0;
  MaKTBanhMax: Number = 0;
  MaLoaiBanhev: Number = 0;
  MaNCCev: Number = 0;
  MaADev: Number = 0;
  PhuongThucev: any;
  KichThuocev: any;
  Banhev: any;
  ListLoaiBanh: TypeProduct[] = [];
  ListNcc: NhaCungCap[] = [];
  ListAD: admin[] = [];
  ListBanh: Product[] = [];
  KTs: KichThuoc[] = [];
  idPN: any;
  idAD: any;
  checBanhMoi: boolean = false;
  checkBanhCu: boolean = false;
  CheckKieuBanh: boolean = false;
  checkKT: boolean = false;
  checkKTBanhCu: boolean = false
  disabledNext: boolean = true;
  disabledPT: boolean = true;
  disabledAD: boolean = false;
  disabledNCC: boolean = false;
  disableTTBanh: boolean = false;
  images: any;
  constructor(
    private routeAC: ActivatedRoute,
    private roter: Router,
    public HDN: HoaDonNhapService,
    public Banh: Product,
    public KichThuocBanhMoi: KichThuocBanh,
    public CTPNMoi: CTPN,
    public LoaiBanhs: LoaiBanhService,
    public Nccs : NhaCungCapService,
    public PhieuNhap: HoaDonNhap,
    public Banhs: BanhService,
    public MaBanhM: mabanhmax,
    public MaPNMax: mabanhmax,
    public MaKTBanh: mabanhmax,
    public http: HttpClient,
    // public Anh: FileAnh,
    
  ) { 
    // this.idPN = this.route.snapshot.queryParamMap.get('id');
    this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
    this.getListLoaiBanh();
    this.getListNCC();
    this.getListAD();
    this.getListKT();
    this.getListbanh();
  }

  ngOnInit(): void {
  }

  // getMaBanhMax(){
  //   this.HDN.getMaBanhMax().subscribe(result => {
  //     this.MaBanhM = result;
  //     this.MaBanhMax = this.MaBanhM.MaBanhMax;
  //   });
  // }

  getListLoaiBanh(){
    this.LoaiBanhs.getLoaiBanh().subscribe(result => {
      this.ListLoaiBanh = result;
    });
  }

  getListNCC(){
    this.Nccs.getListNCC().subscribe(result => {
      this.ListNcc = result;
    });
  }

  getListAD(){
    this.HDN.getListAD().subscribe(result => {
      this.ListAD = result;
    });
  }

  getListKT(){
    this.HDN.getListKichThuoc().subscribe(result => {
      this.KTs = result;
    });
  }

  getListbanh(){
    this.Banhs.getBanh().subscribe(result => {
      this.ListBanh = result;
    });
  }

  taoPhieuNhap(){
    this.HDN.getMaPNMax().subscribe(result => {
      this.MaPNMax = result;
      this.idPN = Number(this.MaPNMax.MaPNMax)+1;
      const conf = window.confirm("Bạn muốn tạo phiếu nhập #"+this.idPN+" ?");
      if(conf){
        this.HDN.taoPhieuNhap(this.idPN,this.idAD,this.MaNCCev,this.PhieuNhap).subscribe(result => {
          this.PhieuNhap = result;
          this.disabledNCC = true;
          this.disabledAD = true;
          this.disabledPT = true;
          this.disabledNext = true;
          this.CheckKieuBanh = true;
        }); 
      }
      });
    
  }

  themBanhMoi(TenBanh: any,MaLoaiBanh: any,AnhSP: any,HinhDang: any,MoTa: any){
    const conf = window.confirm("Bạn muốn thêm không ?");
      if(conf){
        const formData = new FormData();
        formData.append('file', this.images);
        this.http.post<any>('http://localhost:3000/file', formData).subscribe(
          (res) => this.CheckAnh = "http://localhost:3000/Upload/" + res.originalname,
        );
        if(this.CheckAnh == undefined || this.CheckAnh == null){
          this.CheckAnh = "http://localhost:3000/Upload/defaultcake.JPG"
        }
        this.HDN.getMaBanhMax().subscribe(result => {
          this.MaBanhM = result;
          this.MaBanhMax = Number(this.MaBanhM.MaBanhMax) + 1;
            this.HDN.themBanhMoi(this.MaBanhMax,TenBanh,MaLoaiBanh,this.CheckAnh,HinhDang,MoTa,this.Banh).subscribe(result => {
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
          this.HDN.ThemCTPN(this.idPN,this.MaKTBanhMax,NSX,HSD,SL,GhiChu,this.CTPNMoi).subscribe(result => {
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
          this.HDN.ThemCTPN(this.idPN,this.MaKTBanhMax,NSX,HSD,SL,GhiChu,this.CTPNMoi).subscribe(result => {
            this.CTPNMoi = result;
          });
        });
      });
    }
  }

  ThemBanhKhac(){
    const conf = window.confirm("Bạn muốn thêm bánh khác ?");
    if(conf){
      this.disableTTBanh = false;
      this.checkKT = false;
    }
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/Upload/" + this.images.name
    }
  }

  sub(){
    const formData = new FormData();
    formData.append('file', this.images);
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => this.CheckAnh = res.originalname,
    );
  }

  changeClient(ev: any){
    this.MaLoaiBanhev = ev;
  }

  changeClientNCC(ev: any){
    this.MaNCCev = ev;
    this.disabledPT = false;
    this.disabledNext = false;
  }

  changeClientAD(ev: any){
    this.MaADev = ev;
    
  }

  changeClientPhuongThuc(ev: any){
    this.PhuongThucev = ev;
    if(ev == "1"){
      this.checBanhMoi = true;
      this.checkBanhCu = false;
      this.checkKT = false;
      this.disableTTBanh = false;
      }
    else{
      this.checBanhMoi = false;
      this.checkBanhCu = true;
      this.checkKT = false;
      }
  }

  changeClientKT(ev: any){
    this.KichThuocev = ev;
  }

  changeClientListBanh(ev: any){
    this.Banhev = ev;
    if(this.Banhev != null){
      this.checkKTBanhCu = true;
    }
  }

  Thoat(){
    const conf = window.confirm("Bạn có muốn thoát không ?");
    if(conf){
      this.roter.navigate(['hoa-don-nhap']);
    }
  }
}
