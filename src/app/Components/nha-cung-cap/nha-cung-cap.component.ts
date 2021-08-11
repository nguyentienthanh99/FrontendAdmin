import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NhaCungCapService,Task} from '../../API/GetAPI/NhaCungCap/nha-cung-cap.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-nha-cung-cap',
  templateUrl: './nha-cung-cap.component.html',
  styleUrls: ['./nha-cung-cap.component.scss'],
  providers: [Task,NhaCungCapService],
})
export class NhaCungCapComponent implements OnInit {
  checkAllSelected: boolean = false;
  listID: Array<any> = [];
  page =1;
  constructor(
    public dialog: MatDialog,
    private NCC: NhaCungCapService, 
    public task: Task,
  ) {
    this.getListNCC();
   }

  ngOnInit(): void {
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeTailNCCComponent, {
      width: '500px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListNCC();
    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(ThemNCCComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListNCC();
    });
  }

  getListNCC(){
    this.NCC.getListNCC().subscribe(result => {
      this.task.ListNhaCungCap=result;
    });
  }

  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListNhaCungCap == null) {
      return;
    }
    this.task.ListNhaCungCap.forEach(t => t.completed = completed);
  }

  check(id: any,check: boolean){
    
    // }

  }
}


// ----------------------------------------------------------


@Component({
  selector: 'app-detail-nha-cung-cap',
  templateUrl: './detail-ncc.component.html',
  styleUrls: ['./nha-cung-cap.component.scss'],
  providers: [NhaCungCap,NhaCungCapService],
})
export class DeTailNCCComponent implements OnInit {
  checkCF: boolean = false;
  Xoa = 'Xóa';
  CapNhat = 'Cập nhật';
  mesErr: any;
  mesErr1: any;
  mesErr2: any;
  Empty = new FormControl('', [Validators.required]);
  EmptySDT = new FormControl('', [Validators.required]);
  EmptyEmail = new FormControl('', [Validators.required,Validators.email]);

  constructor(
    private roter: Router,
    private NCC: NhaCungCapService,
    public detailNCC: NhaCungCap,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeTailNCCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getDetailNCC();
   }

  ngOnInit(): void {
  }

  deleteNCC(MaNCC: any){
    var comf = window.confirm("Bạn có chắc không ?");
    if(comf){
      this.NCC.deleteNCC(MaNCC,this.detailNCC).subscribe(result => {
        this.detailNCC = result;
      });
      this.dialogRef.close();
    }
        
    }

  updateNCC(MaNCC: any,TenNCC:any,SDT:any,Email:any,DiaChi:any,Phuong:any,Quan:any,ThanhPho:any){    
    if (this.Empty.hasError('required')) {
      this.mesErr = 'Bạn chưa nhập tên nhà cung cấp';
    }
    else if(this.EmptySDT.hasError('required')){
      this.mesErr1 = 'Bạn chưa nhập SĐT';
    }
    else if(this.EmptyEmail.hasError('required')){
      this.mesErr2 = 'Bạn chưa nhập email';
    }
    else if(this.EmptyEmail.hasError('email')){
      this.mesErr2 = 'Nhập sai kiểu';
    }
    else{
      var comf = window.confirm("Bạn có chắc không ?");
      if(comf){
        this.NCC.updateNCC(MaNCC,TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,this.detailNCC).subscribe(result =>{
          this.detailNCC = result;
        });
        this.dialogRef.close();
      }
    }
  }

  getDetailNCC(){
    this.NCC.getDetailNCC(this.data).subscribe(result => {
      this.detailNCC = result;
    });
  }
  closePop(){
    this.dialogRef.close();
  }

  
}



// ----------------------------------------------------------


@Component({
  selector: 'them-nha-cung-cap',
  templateUrl: './them-ncc.component.html',
  styleUrls: ['./nha-cung-cap.component.scss'],
  providers: [NhaCungCap,NhaCungCapService],
})
export class ThemNCCComponent implements OnInit {
  mesErr: any;
  mesErr1: any;
  mesErr2: any;
  mesErr3: any;
  Empty = new FormControl('', [Validators.required]);
  EmptySDT = new FormControl('', [Validators.required]);
  EmptyEmail = new FormControl('', [Validators.required,Validators.email]);
  constructor(
    private roter: Router,
    private NCC: NhaCungCapService,
    public NCCThem: NhaCungCap,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ThemNCCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

   }

  ngOnInit(): void {
  }

  themNCC(TenNCC:any,SDT:any,Email:any,DiaChi:any,Phuong:any,Quan:any,ThanhPho:any){
    if (this.Empty.hasError('required')) {
      this.mesErr = 'Bạn chưa nhập tên nhà cung cấp';
    }
    else if(this.EmptySDT.hasError('required')){
      this.mesErr1 = 'Bạn chưa nhập SĐT';
    }
    else if(this.EmptyEmail.hasError('required')){
      this.mesErr2 = 'Bạn chưa nhập email';
    }
    else if(this.EmptyEmail.hasError('email')){
      this.mesErr2 = 'Nhập sai kiểu';
    }
    else{
      const conf = 'bạn có muốn thêm nhà cung cấp '+TenNCC+' không ?';
      if(conf){
        this.NCC.themNCC(TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,this.NCCThem).subscribe(result => {
          this.NCCThem = result;
        });
        this.dialogRef.close();
      }
    }
  }

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