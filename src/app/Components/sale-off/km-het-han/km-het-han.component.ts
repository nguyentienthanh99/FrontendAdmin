import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhuyenMaiService,Task } from 'src/app/API/GetAPI/KhuyenMai/khuyen-mai.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { saleOff } from 'src/app/data/modal/sale-offs';

@Component({
  selector: 'app-km-het-han',
  templateUrl: './km-het-han.component.html',
  styleUrls: ['./km-het-han.component.scss'],
  providers: [Task,KhuyenMaiService],
})
export class KMHetHanComponent implements OnInit {
  idAD: any;
  public List: saleOff[] = [];
  public ListHetHan: saleOff[] = [];
  page = 1;
  constructor(
    private roter: Router,
    public route: ActivatedRoute,
    public task: Task, 
    public KhuyenMais: KhuyenMaiService,
    public dialog: MatDialog,
  ) { 
    this.idAD = this.route.snapshot.queryParamMap.get("idAD");
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
      const date = new Date();
      this.List.forEach(element => {
        if(date<new Date(element.ThoiGianBatDau) || date>new Date(element.ThoiGianKetThuc)){
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
  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/sale-off/detail-sale-off'],{queryParams :{id : id,idAD: this.idAD}});
  }

}
