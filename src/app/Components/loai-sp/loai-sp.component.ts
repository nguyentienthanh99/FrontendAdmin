import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiBanhService,Task} from '../../API/GetAPI/LoaiBanh/loai-banh.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TypeProduct } from 'src/app/data/modal/type-product';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-loai-sp',
  templateUrl: './loai-sp.component.html',
  styleUrls: ['./loai-sp.component.scss'],
  providers: [Task,LoaiBanhService],
})
export class LoaiSpComponent implements OnInit {
  checkAllSelected: boolean = false;
  idAD: any;
  page = 1;
  constructor(
    public dialog: MatDialog,
    private roter: Router, 
    private LoaiBanh: LoaiBanhService, 
    public task: Task,
    public routeAC: ActivatedRoute,
    ) { 
      this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
      this.getLoaiBanh();
    }

  ngOnInit(): void {
    

  }
  getLoaiBanh(){
    this.LoaiBanh.getLoaiBanh().subscribe(result => {
      this.task.ListLoaiBanh=result;
    });
  }
  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListLoaiBanh == null) {
      return;
    }
    this.task.ListLoaiBanh.forEach(t => t.completed = completed);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThemLoaiBanhComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLoaiBanh();
    });
  }

  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/type-cake/detail-type-cake/'],{queryParams :{id : id,idAD: this.idAD}});
  }
}





// --------------------------------------------------

@Component({
  selector: 'them-loai-banh',
  templateUrl: './them-loai-banh.component.html',
  styleUrls: ['./loai-sp.component.scss'],
  providers: [LoaiBanhService,TypeProduct],
})
export class ThemLoaiBanhComponent implements OnInit {
  TenLoai = new FormControl('', [Validators.required]);
  mesErr: any;
  images: any;
  CheckAnh: any;
  constructor(
    private roter: Router,
    private LoaiBanhs: LoaiBanhService,
    public LoaiBanh: TypeProduct,
    public dialog: MatDialog,
    public http: HttpClient,
    public dialogRef: MatDialogRef<ThemLoaiBanhComponent>,
  ) {

   }

  ngOnInit(): void {
  }

  ThemLoaiBanh(TenLoaiBanh:any,AnhLoai:any,MoTa:any){
    if (this.TenLoai.hasError('required')) {
      this.mesErr = 'Bạn chưa nhập tên loại bánh';
    }
    else{
      const conf = window.confirm("Bạn muốn thêm bánh không ?");
      if(conf){
        const formData = new FormData();
        formData.append('fileAnhLoai', this.images);
        this.http.post<any>('http://localhost:3000/fileAnhLoai', formData).subscribe(
          (res) => console.log(res),
        );
        this.LoaiBanhs.themLoaiBanh(TenLoaiBanh,this.CheckAnh,MoTa,this.LoaiBanh).subscribe(result => {
          this.LoaiBanh = result;
        });
        this.dialogRef.close();
      }
    }
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/AnhLoai/" + this.images.name;
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
