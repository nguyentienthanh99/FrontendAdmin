import {  OnChanges, SimpleChanges } from '@angular/core';
import {Component, OnInit, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Product } from 'src/app/data/modal/product';
import { BanhService,Task } from 'src/app/API/GetAPI/Banh/banh.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoaiBanhService } from 'src/app/API/GetAPI/LoaiBanh/loai-banh.service';
import { TypeProduct } from 'src/app/data/modal/type-product';


@Component({
  selector: 'all-cake',
  templateUrl: './all-cake.component.html',
  styleUrls: ['./all-cake.component.scss'],
  providers: [Task,BanhService],
})


export class AllCakeComponent implements OnInit,OnChanges  {
  itemDaBan: Product[] = [];
  idAD: any;
  constructor(
    private roter: Router,
    public Banhs: BanhService,
    public task : Task,
    public dialog: MatDialog,
    public routeAC: ActivatedRoute,
    ) {
      this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
      this.getBanh();
      this.getBanhDaBan();
      
    }
 
  checkAllSelected: boolean = false;
  dropDown: boolean = true;
  allComplete: boolean = false;
  selectedId: any;
  p = 1;
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges ): void {

  }
  getBanh(){
    this.Banhs.getBanh().subscribe(result=>{
      result.forEach(element => {
        if(element.TrangThaiLoaiBanh == false){
          element.TenLoaiBanh = 'khác';
          
        }
      });
      this.task.ListCake = result;
    });
  }

  getBanhDaBan(){
    this.Banhs.getBanhDaBan().subscribe(result=>{
      this.itemDaBan = result;
      this.task.ListCake.forEach(element => {
        const check =this.itemDaBan.filter(item => item.MaBanh == element.MaBanh)[0];
        if(check != undefined){
        element.SLBan = Number(element.SL)- Number(check.SLBan);
        }else element.SLBan = element.SL;
      });
    });
  }

  updateAllComplete() {
    this.allComplete = this.task.ListCake != null && this.task.ListCake.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.ListCake == null) {
      return false;
    }
    return this.task.ListCake.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListCake == null) {
      return;
    }
    this.task.ListCake.forEach(t => t.completed = completed);
  }
  
  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/all-cake/detail-cake'],{queryParams :{id : id, idAD: this.idAD}});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ThemBanhComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBanh();
    });
  }

}



// ------------------------------------------------------
@Component({
  selector: 'them-banh',
  templateUrl: './them-banh.component.html',
  styleUrls: ['./all-cake.component.scss'],
  providers: [BanhService,LoaiBanhService,Product],
})
export class ThemBanhComponent implements OnInit {
  next: boolean = true;
  ListLoaiBanh: TypeProduct[] = [];
  MaLoaiBanhev: any;
  constructor(
    private roter: Router,
    private Banhs: BanhService,
    public Banh: Product,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ThemBanhComponent>,
    public LoaiBanhs: LoaiBanhService,
  ) {
    this.getListLoaiBanh();
   }

  ngOnInit(): void {
  }

  getListLoaiBanh(){
    this.LoaiBanhs.getLoaiBanh().subscribe(result => {
      this.ListLoaiBanh = result;
    });
  }

  changeClient(ev: any){
    this.MaLoaiBanhev = ev;
  }

  ThemBanh(TenBanh:any,MaLoaiBanh: any,AnhSP: any,HinhDang:any,MoTa:any){
    const conf = window.confirm("Bạn muốn thêm bánh ?");
    if(conf){
      this.Banhs.themBanh(TenBanh,this.MaLoaiBanhev,AnhSP,HinhDang,MoTa,this.Banh).subscribe(result => {
        this.Banh = result;
      });
      this.dialogRef.close();
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
