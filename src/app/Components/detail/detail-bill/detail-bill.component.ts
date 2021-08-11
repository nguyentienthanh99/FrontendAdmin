import { Component, OnInit, Inject } from '@angular/core';
import { Bill,SoHoaDon } from 'src/app/data/modal/bills';
import { Router, ActivatedRoute  } from '@angular/router';
import { HoaDonService } from 'src/app/API/GetAPI/HoaDon/hoa-don.service';
import { CTHD } from 'src/app/data/modal/CTHD';
import { KhachHangService } from 'src/app/API/GetAPI/KhachHang/khach-hang.service';
import { Customer } from 'src/app/data/modal/customer';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.scss'],
  providers: [HoaDonService,Bill,SoHoaDon,KhachHangService,Customer],
})
export class DetailBillComponent implements OnInit {
  id: any;
  idAD: any;
  itemCTHDs : CTHD[] = [];
  itemCTHDsThat : CTHD[] = [];
  DemSP: number = 0;
  TongSL: number = 0;
  ThanhTien: number = 0;
  giaItem: number = 0;
  checkData: boolean = true;
  SoTienDaThanhToan: Number = 0 ;
  SoTienConLaiLucDau: Number = 0;
  date = new Date();
  constructor(
    private roter: Router,
    private route: ActivatedRoute,
    public item: Bill,
    public SoHD : SoHoaDon,
    public HDX: HoaDonService,
    public KhachHangs: KhachHangService,
    public KhachHang: Customer,
    public dialog: MatDialog,
    ) { 
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.idAD = this.route.snapshot.queryParamMap.get('idAD');
      this.getDeTailBill();
      this.getListCTHD();
      
    }
  ngOnInit(): void {
  }

  //lấy detail
  getDeTailBill(){
    this.HDX.getDetailHoaDon(this.id).subscribe(result => {
      this.item = result;
      this.getSoHD();
      this.getKhachHang();
      
    });
    
  }
  GoToDetail(id: any){
    this.roter.navigate(['all-bill/detail-bill/detail-cake/'],{queryParams :{id : id,idAD: this.idAD}});
  }

  // lấy số háo đơn
  getSoHD(){
    this.HDX.getSoHoaDon(Number(this.item.MaKH)).subscribe(result => {
      this.SoHD = result;
    });
  }

  //lấy list sản phẩm
  getListCTHD(){
    this.HDX.getListCTHD(this.id).subscribe(result => {
      this.itemCTHDs = result;
      this.itemCTHDs.forEach(ele=>{
        this.DemSP++;
        const date1 = new Date(ele.ThoiGianBatDau);
        const date2 = new Date(ele.ThoiGianKetThuc);
        if(ele.LoaiKM=="%" && date1 < this.date && date2>this.date){
          
          ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan) -  Number(ele.SL)*Number(ele.DonGiaBan)*Number(ele.GiaTri)/100;
        }
        else if(ele.LoaiKM=="Tien" && date1 < this.date && date2>this.date){
          ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan) -  Number(ele.SL)*Number(ele.GiaTri);
        }
        else {
          ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan);
          ele.GiaTri = 0;
        }
        this.ThanhTien += Number(ele.TongTien);
      });
      this.SoTienDaThanhToan = this.ThanhTien - Number(this.item.SoTienConLai);
    });
  }

  //Lấy thông tin người dùng
getKhachHang(){
  this.KhachHangs.getDetailKhachHang(this.item.MaKH).subscribe(result => {
    this.KhachHang = result;
  });
}


  comfirm(MaHD: any){
    const conf = window.confirm('Bạn đã xác thực đơn hàng ?');
    if(conf){
      this.HDX.xacThucDonHang(MaHD,this.item).subscribe(result => {
        this.item = result;
        this.getDeTailBill();
      });
      
    }
  }

  comfirmGiaoHang(MaHD: any){
    const conf = window.confirm('Bạn xác thực hàng đang được giao ?');
    if(conf){
      this.HDX.xacThucGiaoHang(MaHD,this.item).subscribe(result => {
        this.item = result;
        this.getDeTailBill();
      });
      
    }
  }

  comfirmThanhToan(MaHD: any){
    const conf = window.confirm('Bạn xác thực đã thanh toán hết ?');
    if(conf){
      this.HDX.xacThucThanhToan(MaHD,this.item).subscribe(result => {
        this.item = result;
        this.getDeTailBill();
      });
      
      // this.getListCTHD();
    }
  }

  datCoc(MaHD: any,SoTienConLai: any){
      this.HDX.datCoc(MaHD,SoTienConLai,this.item).subscribe(result => {
        this.item = result;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DatCocComponent, {
      width: '500px',
      data: this.item,
      // data1: ThanhTien,
    });
    this.SoTienConLaiLucDau = this.item.SoTienConLai;
    dialogRef.afterClosed().subscribe(result => {
      if(this.item.SoTienConLai > Number(this.ThanhTien)){
        this.datCoc(this.item.MaHD,this.SoTienConLaiLucDau);
        this.getDeTailBill();
        window.alert("Bạn đã nhập số đã thanh toán nhiều hơn giá trị đơn hàng. Hãy lòng nhập lại !!!");
      }
      else if(this.item.SoTienConLai < 0 ){
        this.datCoc(this.item.MaHD,this.SoTienConLaiLucDau);
        this.getDeTailBill();
        window.alert("Bạn đã nhập số nhỏ hơn 0. Hãy lòng nhập lại !!!");
      }
      else if(this.item.SoTienConLai == Number(this.ThanhTien)){
        window.alert("Đã thanh toán hết !!!");
        this.comfirmThanhToan(this.item.MaHD);
      }
      else {
        this.getDeTailBill();
        this.SoTienDaThanhToan = this.ThanhTien - Number(this.item.SoTienConLai);
      }
      
    });
  }

  suaDiaChiGiaoHang(MaKH: any){
    const dialogRef = this.dialog.open(DiaChiComponent, {
      width: '500px',
      data: MaKH,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getKhachHang();
    });
  }

}


// ----------------------------------------------------------


@Component({
  selector: 'dat-coc',
  templateUrl: './dat-coc.component.html',
  styleUrls: ['./detail-bill.component.scss'],
  providers: [HoaDonService,Bill],
})
export class DatCocComponent implements OnInit {
  mesErr: any;
  Empty = new FormControl('', [Validators.required]);
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DatCocComponent>,
    public HDX: HoaDonService,
    @Inject(MAT_DIALOG_DATA) public data: Bill,
  ) {

   }

  ngOnInit(): void {
  }

  datCoc(MaHD: any,SoTienConLai: any){
    const conf = window.confirm('Bạn xác thực hàng đang được giao ?');
    if(conf){
      this.HDX.datCoc(MaHD,SoTienConLai,this.data).subscribe(result => {
        this.data = result;
      });
      this.dialogRef.close();
    }
  }
  close(){
    var comf = window.confirm("Bạn có chắc muốn hủy không ?");
    if(comf){
      this.dialogRef.close();
    }
  }

  closePop(){
    this.dialogRef.close();
  }
}


// ----------------------------------------------------------


@Component({
  selector: 'dia-chi',
  templateUrl: './dia-chi.component.html',
  styleUrls: ['./detail-bill.component.scss'],
  providers: [HoaDonService,Bill,KhachHangService,Customer],
})
export class DiaChiComponent implements OnInit {
  mesErr: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DiaChiComponent>,
    public HDX: HoaDonService,
    public KhachHangs: KhachHangService,
    public KhachHang: Customer,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
   }

  ngOnInit(): void {
  }

    //Lấy thông tin người dùng
  // getKhachHang(){
  //   this.KhachHangs.getDetailKhachHang(this.data).subscribe(result => {
  //     this.KhachHang = result;
  //   });
  // }

  suaKhachHang(MaKH: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any){
    const conf = window.confirm("Bạn muốn sửa địa chỉ không ?");
    if(conf){
      this.KhachHangs.suaDiaChiKhachHang(DiaChi,Phuong,Quan,ThanhPho,this.data,this.KhachHang).subscribe(result => {
        this.KhachHang = result;
      });
      this.dialogRef.close();
    }
  }
  close(){
    var comf = window.confirm("Bạn có chắc muốn đóng không ?");
    if(comf){
      this.dialogRef.close();
    }
  }

  closePop(){
    this.dialogRef.close();
  }
}