import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhuyenMaiService,Task } from 'src/app/API/GetAPI/KhuyenMai/khuyen-mai.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { saleOff } from 'src/app/data/modal/sale-offs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sale-off',
  templateUrl: './sale-off.component.html',
  styleUrls: ['./sale-off.component.scss'],
  providers: [Task,KhuyenMaiService],
})
export class SaleOffComponent implements OnInit {
  idAD: any;
  public List: saleOff[] = [];
  page = 1;
  constructor(
    private roter: Router,
    public routeAC: ActivatedRoute,
    public task: Task, 
    public KhuyenMais: KhuyenMaiService,
    public dialog: MatDialog,
    ) { 
    this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
    this.getKhuyenMais();
    // this.updateKM();
  }
  checkText: boolean = true;
  checkAllSelected: boolean = false;
  ngOnInit(): void {
    
  }

  getKhuyenMais(){
    this.KhuyenMais.getAllKhuyenMai().subscribe(result => {
      // this.task.ListSaleOff= result;
      this.List= result;
      console.log(this.List);
      const date = new Date();
      this.List.forEach(element => {
        if(date>new Date(element.ThoiGianBatDau) && date<new Date(element.ThoiGianKetThuc)){
          this.task.ListSaleOff.push(element);
        }
      });
    });
  }

  updateKM(){
    const date = new Date();
    this.task.ListSaleOff.forEach(element => {
      if((element.ThoiGianBatDau>date || element.ThoiGianKetThuc<date) && element.ThoiGianBatDau.toString() != '' && element.ThoiGianKetThuc.toString() != ''){
        this.KhuyenMais.xoaKM(element.MaKM,element).subscribe(result => {
          element = result;
        });
      }
    });
    this.getKhuyenMais();
  }

  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListSaleOff == null) {
      return;
    }
    this.task.ListSaleOff.forEach(t => t.completed = completed);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThemKMComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getKhuyenMais();
      setTimeout(() => {
        location.reload();
      }, 300);
    });
  }

  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/sale-off/detail-sale-off'],{queryParams :{id : id,idAD: this.idAD}});
  }
}




// -------------------------------------

@Component({
  selector: 'them-KM',
  templateUrl: './them-KM.component.html',
  styleUrls: ['./sale-off.component.scss'],
  providers: [KhuyenMaiService,saleOff],
})
export class ThemKMComponent implements OnInit {
  demo: any;
  Image: any;
  loaiKM: any;
  images: any;
  CheckAnh: any;
  constructor(
    private roter: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ThemKMComponent>,
    public KhuyenMais: KhuyenMaiService,
    public item: saleOff,
    public http: HttpClient,
  ) {

   }

  ngOnInit(): void {
  } 

  changeClient(ev: any){
    this.loaiKM = ev;
  }
  themKM(TieuDe: any,GiaTri: any,LoaiKM: any,ThoiGianBatDau: any,ThoiGianKetThuc: any,MoTa: any){
    const conf = window.confirm("Bạn muốn thêm khuyến mại ? ");
    if(conf){
      const formData = new FormData();
        formData.append('fileAnhKM', this.images);
        this.http.post<any>('http://localhost:3000/fileAnhKM', formData).subscribe(
          (res) => console.log(res),
        );
        if(this.CheckAnh == undefined){
          this.CheckAnh = "http://localhost:3000/AnhKM/default.jpg";
        }
      this.KhuyenMais.themKM(TieuDe,this.CheckAnh,GiaTri,this.loaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,this.item).subscribe(result => {
        this.item = result;
        this.item.GiaTri.toString();
      });
      this.dialogRef.close();
    }
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/AnhKM/" + this.images.name;
      console.log(this.CheckAnh);
      
    }    
  }

  // ckeckImage(){
  //   if(this.item.AnhLoai == '' || this.item.AnhLoai  == null){
  //     this.item.AnhLoai = 'src/assets/cake/default.png';
  //   }
  // }

  close(){
    var comf = window.confirm("Bạn có chắc không ?");
    if(comf){
      this.dialogRef.close();
    }
  }

  closePop(){
    this.dialogRef.close();
  }
}