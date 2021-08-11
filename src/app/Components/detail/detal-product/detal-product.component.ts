import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BanhService } from 'src/app/API/GetAPI/Banh/banh.service';
import { Product } from 'src/app/data/modal/product';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';
import { HSD } from 'src/app/data/modal/HSD';
import {FormControl, Validators } from '@angular/forms';
import { LoaiBanhService } from 'src/app/API/GetAPI/LoaiBanh/loai-banh.service';
import { TypeProduct } from 'src/app/data/modal/type-product';
import { XoaNCCOfCake } from 'src/app/data/modal/XoaNCCofCake';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detal-product',
  templateUrl: './detal-product.component.html',
  styleUrls: ['./detal-product.component.scss'],
  providers: [BanhService,Product,NhaCungCap,HSD,LoaiBanhService,TypeProduct,XoaNCCOfCake],
})
export class DetalProductComponent implements  OnInit { 
  myControl = new FormControl();
  Empty = new FormControl('', [Validators.required]);
  mesErr: any;
  id: any;
  date: any;
  SLTon: Number = 0;
  millisecondsPerDay = 1000 * 60 * 60 * 24;
  itemNCC: NhaCungCap[] = [];
  itemHSD: HSD[] = [];
  itemLoaiBanh: TypeProduct[] = [];
  displayedColumnsNCC: string[] = ['Mã NCC', 'Tên NCC', 'SĐT', 'Email', 'Địa chỉ'];
  checkClickButtonAddNCC: boolean = false;
  checkClickButtonAddKT: boolean = false;
  idAD: any;
  ten: any ;
  images: any;
  public CheckAnh: any;
  constructor(
    private route: ActivatedRoute,
    private roter: Router,
    public Banhs: BanhService,
    public item : Product,
    public itemDaBan : Product,
    public itemDeleteHSD : HSD,
    public LoaiBanhs: LoaiBanhService,
    public Xoa: XoaNCCOfCake,
    public http: HttpClient,
    // public itemNCC : NhaCungCap,
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.getBanh();
    this.getDetailBanhDaBan();
    this.getNCC();
    this.getHSD();
    this.getAllLoaiBanh();
    
   }
  
  ngOnInit(): void {
    
  }

  //Lấy dữ liệu của bánh
  getBanh(){
    this.Banhs.getDetailBanh(this.id).subscribe((result) =>{
      this.item = result;
      // console.log(this.item);
      this.ten = this.item.MaLoaiBanh;
      console.log(this.item);
      this.checkImg();
    });
    
  }

  getDetailBanhDaBan(){
    this.Banhs.getDetailBanhDaBan(this.id).subscribe(result => {
      this.itemDaBan = result;
      if(Number(this.itemDaBan.SLBan) > 0){
        this.SLTon = Number(this.item.SL)-Number(this.itemDaBan.SLBan);
      }
      else this.SLTon = Number(this.item.SL);
    });
  }

  //lấy dữ liệu của các nhà cung cấp
  getNCC(){
    this.Banhs.getNCC(this.id).subscribe(result => {
      this.itemNCC = result;
    });
  }

  //lấy dữ liệu hạn sử dụng
  getHSD(){
    const now = new Date();
    this.Banhs.getHSD(this.id).subscribe(result => {
      this.itemHSD = result;
      this.itemHSD .forEach(element => {
        const a = element.HSD.toString();
        if(now > new Date(element.HSD) || now < new Date(element.NSX)){
          element.TinhTrang = "Hết hạn";
        }
        if(new Date(element.HSD).getTime() - now.getTime() <=2*(24*60*60*1000) && new Date(element.HSD).getTime() - now.getTime()>0){
          element.TinhTrang = "Sắp hết hạn";
        }
        else element.TinhTrang = "";
      });
    });
  }

  //xóa hạn sử dụng
  xoaHSD(MaKT_Banh: any,NSX: Date,HSD: Date){
    const conf = window.confirm("Bạn muốn xóa kích thước bánh "+MaKT_Banh+" có hạn sử dụng từ "+NSX+" đến "+HSD+" không ?");
    if(conf){
      this.Banhs.xoaHSD(MaKT_Banh,NSX,HSD,this.itemDeleteHSD).subscribe(result => {
        this.itemDeleteHSD = result;
      });
      this.getBanh();
      this.getNCC();
      this.getHSD();
    }
  }

  //Lấy list loại bánh
  getAllLoaiBanh(){
    this.LoaiBanhs.getLoaiBanh().subscribe(result => {
      this.itemLoaiBanh = result;
      
    })
  }

  // Xóa NCC
  XoaNCCCuaBanh(MaBanh: any,MaNCC: any){
    const comf = window.confirm('Bạn muốn xóa NCC '+MaNCC+' không ?');
    if(comf){
      this.Banhs.deleteNCCCuaBanh(MaBanh,MaNCC,this.Xoa).subscribe(result =>{
        this.Xoa = result;
      });
      this.getBanh();
      this.getNCC();
      this.getHSD();
    }
  }

  //Xóa bánh
  deleteBanh(MaBanh: any){
    const comf = window.confirm('Bạn muốn xóa bánh '+MaBanh+' không ?');
    if(comf){
      this.Banhs.xoaBanh(MaBanh,this.item).subscribe(result => {
        this.item = result;
      });
      this.roter.navigate(['all-cake']);
    }
  }

  suaBanh(MaBanh: any,TenBanh:any,MaLoaiBanh: any,AnhSP: any,HinhDang:any,MoTa:any){
    // if (this.Empty.hasError('required')) {
    //   this.mesErr = 'Bạn chưa nhập tên bánh';
    // }
    // else{      
      var conf = window.confirm("Bạn có chắc không ?");
      if(conf){
        const formData = new FormData();
        formData.append('file', this.images);
        this.http.post<any>('http://localhost:3000/file', formData).subscribe(
          (res) => console.log(res),
        );
        if(this.CheckAnh == undefined){
          this.CheckAnh = AnhSP;
        }
        this.Banhs.suaBanh(MaBanh,TenBanh,MaLoaiBanh,this.CheckAnh,HinhDang,MoTa,this.item).subscribe(result =>{
          this.item = result;
        });
        window.alert("Cập nhật thành công");
        this.getBanh();
        // this.getNCC();
        // this.getHSD();
      }
    // }    
  }
  changeClient(id: any){
    this.ten = id;
    console.log(id+1);
    
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/Upload/" + this.images.name;
    }    
  }

  sub(){
    const formData = new FormData();
        formData.append('file', this.images);
        this.http.post<any>('http://localhost:3000/file', formData).subscribe(
          (res) => console.log(res),
        );
  }
    
  AddNCC(){
    this.checkClickButtonAddNCC=true;
  }
  CloseAddNCC(){
    this.checkClickButtonAddNCC=false;
  }
  AddKT(){
    this.checkClickButtonAddKT=true;
  }
  CloseAddKT(){
    this.checkClickButtonAddKT=false;
  }
  getKichThuoc(){

  }
  changeClientHD(ev : any){
    console.log(ev);
    
  }
  checkImg(){
    if(this.item.AnhSP == "" || this.item.AnhSP == null){
      this.item.AnhSP = "../../../../assets/cake/default.png";
    }
  }
}
