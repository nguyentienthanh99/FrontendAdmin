import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoaDonService } from 'src/app/API/GetAPI/HoaDon/hoa-don.service';
import { KhachHangService } from 'src/app/API/GetAPI/KhachHang/khach-hang.service';
import { Bill } from 'src/app/data/modal/bills';
import { CTHD } from 'src/app/data/modal/CTHD';
import { Customer } from 'src/app/data/modal/customer';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
  providers: [KhachHangService,Customer,Bill,HoaDonService],
})
export class DetailCustomerComponent implements OnInit {
  id: any;
  idAD: any;
  itemBill: any;
  customer: any;
  countCoin: any = 0;
  checkText: boolean = true;
  listBill: Bill[] = [];
  itemCTHDs : CTHD[] = [];
  ThanhTien: number = 0;
  date = new Date();
  Tong: any = 0;
  mess: any;
  messNS: any;
  page = 1;
  checkListBill: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private roter: Router,
    public cus: KhachHangService, 
    public item: Customer,
    public countBill: Customer,
    public billGanNhat: Bill,
    public HDX: HoaDonService,
  ) { 
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.getSoHD();
    this.getKH();
    this.getListBill();
    
    
  }

  ngOnInit(): void {
  
  }

  getKH(){
    this.cus.getDetailKhachHang(this.id).subscribe((result) =>{
      this.item = result;
      if(this.item.NgaySinh == '' || this.item.NgaySinh == null){
        this.messNS = "Không có ngày sinh"
        this.checkText = false;
      }
      else this.checkText = true;

    });
  }


  getSoHD(){
    this.cus.getSoHoaDonCuaKhachHang(this.id).subscribe(result=>{
      this.countBill=result;
    })
  }

  getListBill(){
    this.cus.getdanhSachHoaDonCuaKhachHang(this.id).subscribe(result => {
      this.listBill = result;
      if(this.listBill.length != 0){
        this.DonDatGanNhat();
        this.checkListBill = true;
      }
      else {
        this.mess = "Không có hóa đơn nào";
        this.checkListBill = false;
      }
    });
    
  }

  // getListCTHD(MaHD: Number){
  //   this.HDX.getListCTHD(MaHD).subscribe(result => {
  //     this.itemCTHDs = result;
  //     console.log(this.itemCTHDs);
  //     this.itemCTHDs.forEach(ele=>{
  //       const date1 = new Date(ele.ThoiGianBatDau);
  //       const date2 = new Date(ele.ThoiGianKetThuc);
  //       if(ele.LoaiKM=="%" && date1 < this.date && date2>this.date){
          
  //         ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan) -  Number(ele.SL)*Number(ele.DonGiaBan)*Number(ele.GiaTri)/100;
  //       }
  //       else if(ele.LoaiKM=="Tien" && date1 < this.date && date2>this.date){
  //         ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan) -  Number(ele.GiaTri);
  //       }
  //       else {
  //         ele.TongTien = Number(ele.SL)*Number(ele.DonGiaBan);
  //         ele.GiaTri = 0;
  //       }
  //       this.ThanhTien += Number(ele.TongTien);
  //     });
  //   });
  // }
  
  DonDatGanNhat(){
    this.billGanNhat = this.listBill[0];
    this.listBill.forEach(result => {
      if(result.NgayTaoHD > this.billGanNhat.NgayTaoHD){
        this.billGanNhat = result;
      }
    });
  }

  GoToDetail(id: any){
    this.roter.navigate(['customer/detail-customer/detail-bill/'],{queryParams :{id : id,idAD: this.idAD}});
  }

}
