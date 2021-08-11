import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BanhService, Task } from 'src/app/API/GetAPI/Banh/banh.service';
import { KhuyenMaiService } from 'src/app/API/GetAPI/KhuyenMai/khuyen-mai.service';
import { BanhChuaKM } from 'src/app/data/modal/BanhChuaKM';
import { KMBanh } from 'src/app/data/modal/KhuyenMaiBanh';
import { Product } from 'src/app/data/modal/product';
import { saleOff } from 'src/app/data/modal/sale-offs';

@Component({
  selector: 'app-detail-sale-off',
  templateUrl: './detail-sale-off.component.html',
  styleUrls: ['./detail-sale-off.component.scss'],
  providers: [saleOff,KhuyenMaiService,BanhService,Task,KMBanh,Product],
})
export class DetailSaleOffComponent implements OnInit {
  id: any;
  idAD: any;
  idBanhChuaKM: any;
  checkLoaiKM: boolean = true;
  loaiKM: any;
  CheckHan: boolean = true;
  Banhs: Product[] = [];
  mes: any;
  ten: any;
  MaBanh: any;
  checkClickButtonAddKT: boolean = false;
  BanhChuaKM1: BanhChuaKM[] = [];
  BanhChuaKM: BanhChuaKM[] = [];
  constructor(
    private route: ActivatedRoute,
    public KhuyenMais: KhuyenMaiService,
    public KhuyenMai: saleOff,
    private roter: Router,
    public Banhsv: BanhService,
    public task: Task,
    public KMBanh: KMBanh,
    public filterProduct: Product,
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.getKhuyenMai();
    this.getLisBanhKM();
    this.getListBanh();
    this.getbanhChuaKM();
   }

  ngOnInit(): void {

  }

  getKhuyenMai(){
    this.KhuyenMais.getDetailKhuyenMai(this.id).subscribe(result => {
      this.KhuyenMai = result;
      console.log(this.KhuyenMai);
      
      if(this.KhuyenMai.LoaiKM == "%"){
        this.checkLoaiKM = true;
      }
      else this.checkLoaiKM = false;

      const date = new Date();
      if(date<new Date(this.KhuyenMai.ThoiGianBatDau) || date>new Date(this.KhuyenMai.ThoiGianKetThuc)){
        this.CheckHan = false;
      }
    });
  }

  phanTram(){
    this.checkLoaiKM = true;
    this.loaiKM = "%";
  }
  tien(){
    this.checkLoaiKM = false;
    this.loaiKM = "Tien";
  }

  getLisBanhKM(){
    this.KhuyenMais.getBanhKM(this.id).subscribe(result => {
      if(result.length != 0){
        this.Banhs = result;
      }
      else this.mes = "không có bánh"
    });
  }

  getListBanh(){
    this.Banhsv.getBanh().subscribe(result=>{
      result.forEach(element => {
        if(element.TrangThaiLoaiBanh == false){
          element.TenLoaiBanh = 'khác';
        }
      });
      this.task.ListCake = result;
    });
  }

  themBanhVaoKM(id: any){
    const conf = window.confirm("bạn muốn thêm khuyến mại cho "+this.ten+" không ?");
    if(conf){
      this.KhuyenMais.themBanhVaoKM(this.idBanhChuaKM,id,this.KMBanh).subscribe(result => {
        this.KMBanh = result;
        this.checkClickButtonAddKT=false;
      this.getLisBanhKM();
      this.getbanhChuaKM();
      });
      
      
    }
  }
  
  getbanhChuaKM(){
    const date = new Date();
    this.BanhChuaKM = [];
    this.KhuyenMais.getBanhChuaKM().subscribe(result =>{
      this.BanhChuaKM1 = result;
      this.BanhChuaKM1.forEach(element => {
          if(element.MaKM == null || new Date(element.ThoiGianBatDau) > date || new Date(element.ThoiGianKetThuc) < date){
            this.BanhChuaKM.push(element);
          }
      });
    });
  }

  changeClient(id: any){
    this.idBanhChuaKM = id;
    this.BanhChuaKM.forEach(item => {
      if(id == item.MaBanh){
        this.ten = item.TenBanh;
      }
    });
    // this.ten = this.task.ListCake[id].TenBanh;
    // this.MaBanh = this.task.ListCake[id].MaBanh;
    // this.ten = this.BanhChuaKM[id].TenBanh;
    // this.MaBanh = this.BanhChuaKM[id].MaBanh;
  }

  GoToDetail(id: any){
    this.roter.navigate(['all-cake/detail-cake'],{queryParams :{id : id}});
  }

  suaKM(MaKM: any,TieuDe: any,GiaTri: any,LoaiKM: any,ThoiGianBatDau: any,ThoiGianKetThuc: any,MoTa: any){
    const conf = window.confirm("Bạn muốn sửa khuyến mại ? ");
    if(conf){
      this.KhuyenMais.suaKM(MaKM,TieuDe,GiaTri,this.loaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,this.KhuyenMai).subscribe(result => {
        this.KhuyenMai = result;
        this.getKhuyenMai();
      });
      
    }
  }

  xoaKM(MaKM: any){
    const conf = window.confirm("Bạn muốn xóa khuyến mại ? ");
    if(conf){
      this.KhuyenMais.xoaKM(MaKM,this.KhuyenMai).subscribe(result => {
        this.KhuyenMai = result;
      });
      this.roter.navigate(['menu/index/sale-off'],{queryParams :{idAD : this.idAD}});
    }
  }

  AddKT(){
    const date = new Date();
    if(this.KhuyenMai.ThoiGianBatDau > date || this.KhuyenMai.ThoiGianKetThuc < date){
      this.checkClickButtonAddKT=false;
    }
    else this.checkClickButtonAddKT=true;
  }

  CloseAddKT(){
    const conf = window.confirm("Bạn có muốn hủy không ?");
    if(conf){
      this.checkClickButtonAddKT=false;
    }
  }
}
