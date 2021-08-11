import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task,HoaDonService } from 'src/app/API/GetAPI/HoaDon/hoa-don.service';

@Component({
  selector: 'app-all-bill',
  templateUrl: './all-bill.component.html',
  styleUrls: ['./all-bill.component.scss'],
  providers: [Task,HoaDonService],
})
export class AllBillComponent implements OnInit {
  idAD: any;
  message:any;
  DonVi = 'Tien';
  ckechLoaiKM: boolean = false;
  ThanhTien: any = '';
  page = 1;
  constructor(
    private router: Router,
    public task: Task,
    public HDX: HoaDonService,
    private route: ActivatedRoute,
    ) { 
      this.idAD = this.route.snapshot.queryParamMap.get('idAD');
      this.getBills();
      
    }
  checkAllSelected: boolean = false;
  ngOnInit(): void {

  }

  getBills(){
    this.HDX.getAllHoaDon().subscribe(result => {
      this.task.ListBill = result;
      // this.checkLoai();
    });
    
  }

  // checkLoai(){
  //   this.task.ListBill.forEach(ele => {
  //     if(ele.LoaiKM == "%" && Number(ele.TongHD)>=Number(ele.MocKM)){
  //       ele.ThanhTien = Number(ele.TongHD) - Number(ele.TongHD)*Number(ele.GiaTri)/100;
  //     }
  //     else if(ele.LoaiKM == "Tien" && Number(ele.TongHD)>=Number(ele.MocKM)){
  //       ele.ThanhTien = Number(ele.TongHD) - Number(ele.GiaTri);
  //     }
  //     else ele.ThanhTien = Number(ele.TongHD);
  //   });
  // }
  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListBill == null) {
      return;
    }
    this.task.ListBill.forEach(t => t.completed = completed);
  }

  GoToDetail(id: any){
    this.router.navigate(['/menu/index/all-bill/detail-bill/'],{queryParams :{id : id, idAD: this.idAD}});
  }
}
