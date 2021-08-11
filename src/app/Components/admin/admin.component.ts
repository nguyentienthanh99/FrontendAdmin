import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachHangService } from 'src/app/API/GetAPI/KhachHang/khach-hang.service';
import { Admin } from 'src/app/data/modal/customer';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [KhachHangService,Admin],
})
export class AdminComponent implements OnInit {
  idAD: any;
  Admins: Admin[] = [];
  page = 1;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public adminSV: KhachHangService,
    public dialog: MatDialog,
    public admin: Admin,
  ) { 
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.getListAd();
  }

  ngOnInit(): void {

  }

  getListAd(){
    this.adminSV.getAdmin().subscribe(result => {
      this.Admins = result;
    });
  }

  openDialogAdminDetail(ev : any): void {
    const dialogRef = this.dialog.open(DetailAdminComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListAd();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThemAdminComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getListAd();
    });
  }

  xoaAD(idAD: any){
    const conf = window.confirm("Bạn có chắc muốn xóa không ?");
    if(conf){
      this.adminSV.xoaAdmin(idAD,this.admin).subscribe(result => {
        this.admin = result;
      });
      this.router.navigate(['']);
    }
  }
}

// --------------------------------------------------

@Component({
  selector: 'them-loai-banh',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class DetailAdminComponent implements OnInit {
  // TenLoai = new FormControl('', [Validators.required]);
  mesErr: any;
  images: any;
  CheckAnh: any;
  constructor(
    private roter: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DetailAdminComponent>,
  ) {

   }

  ngOnInit(): void {
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


// --------------------------------------------------

@Component({
  selector: 'them-loai-banh',
  templateUrl: './them-admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [Admin,KhachHangService],
})
export class ThemAdminComponent implements OnInit {
  // TenLoai = new FormControl('', [Validators.required]);
  mesErr: any;
  images: any;
  CheckAnh: any;
  typeInput = "password";
  typeInputLai = "password";
  itemCheckPass: boolean = true;
  itemCheckPassLai: boolean = true;
  passLai: any;
  EmptyPass = new FormControl('', [Validators.required,Validators.minLength(6)]);
  EmptyTen = new FormControl('', [Validators.required,Validators.minLength(6)]);
  constructor(
    private roter: Router,
    public admin: Admin,
    public adminSV: KhachHangService,
    public http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ThemAdminComponent>,
  ) {

   }

  ngOnInit(): void {
  }

  checkPas(){
    this.itemCheckPass = !this.itemCheckPass;
    this.checkTypeInput();
  }

  checkTypeInput(){
    if(this.itemCheckPass == false){
      this.typeInput = 'text';
    }
    else this.typeInput = 'password';
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/AnhAdmin/" + this.images.name;
    }    
  }

  themAD(){
    
      if(this.EmptyTen.hasError("required") || this.EmptyTen.hasError("minlength") || this.EmptyPass.hasError("required") || this.EmptyPass.hasError("minlength")){

      }
      else{
        const conf = window.confirm("bạn có chắc muốn thêm không ?");
      if(conf){
        const formData = new FormData();
      formData.append('fileAnhAdmin', this.images);
      this.http.post<any>('http://localhost:3000/fileAnhAdmin', formData).subscribe(
        (res) => console.log(res),
      );
      if(this.CheckAnh == "" || this.CheckAnh == null){
        this.CheckAnh = "http://localhost:3000/AnhAdmin/default.jpg";
      }
      this.adminSV.themAD(this.CheckAnh,this.admin.TenAD,this.admin.MatKhau,this.admin).subscribe(result => {
        this.admin = result;
      });
      this.closePop();
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
