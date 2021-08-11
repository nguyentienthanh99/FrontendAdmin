import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoaDonNhapService,Task } from 'src/app/API/GetAPI/HoaDonNhap/hoa-don-nhap.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { mabanhmax } from 'src/app/data/modal/MaBanhMax';

@Component({
  selector: 'app-hoa-don-nhap',
  templateUrl: './hoa-don-nhap.component.html',
  styleUrls: ['./hoa-don-nhap.component.scss'],
  providers: [Task,HoaDonNhapService,mabanhmax],
})
export class HoaDonNhapComponent implements OnInit, AfterViewInit {
  checkAllSelected: boolean = false;
  demo: any;
  idPN: any;
  idAD: any;
  page = 1;
  constructor(
    private roter: Router,
    public routeAC: ActivatedRoute,
    public task: Task,
    public HDN: HoaDonNhapService,
    public dialog: MatDialog,
    public MaPNMax: mabanhmax,
  ) { 
    this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
    this.getListHDN();
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
  }

  getListHDN(){
    this.HDN.getAllHoaDonNhap().subscribe(result => {
      this.task.ListHDN = result;
    });
  }

  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListHDN == null) {
      return;
    }
    this.task.ListHDN.forEach(t => t.completed = completed);
  }

  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/hoa-don-nhap/detail-hoa-don-nhap'],{queryParams :{id : id,idAD: this.idAD}});
  }

  ThemHDN(){
    this.HDN.getMaPNMax().subscribe(result => {
      this.MaPNMax = result;
      this.idPN = Number(this.MaPNMax.MaPNMax)+1;
      this.roter.navigate(['/menu/index/hoa-don-nhap/them-hoa-don-nhap/'],{queryParams :{id : this.idPN, idAD: this.idAD}});
    });
    
  }

}



