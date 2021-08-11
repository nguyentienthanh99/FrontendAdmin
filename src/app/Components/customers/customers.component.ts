import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachHangService,Task } from 'src/app/API/GetAPI/KhachHang/khach-hang.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [Task,KhachHangService],
})
export class CustomersComponent implements OnInit {
  idAD: any;
  page = 1;
  checkAllSelected: boolean = false;
  constructor(
    private roter: Router,
    private route: ActivatedRoute,
    public cus: KhachHangService, 
    public task: Task
    ) {
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.cus.getKhachHang().subscribe((result) =>{
      this.task.ListCustomer = result;
    });
   }
  ngOnInit(): void {
    // this.task.completed = false;
    
  }
  setAll(completed: boolean) {
    this.checkAllSelected = completed;
    if (this.task.ListCustomer == null) {
      return;
    }
    this.task.ListCustomer.forEach(t=> t.completed = completed);
  }

  GoToDetail(id: any){
    this.roter.navigate(['/menu/index/customer/detail-customer/'],{queryParams :{id : id,idAD: this.idAD}});
  }
}


// export class Task {
//   completed: boolean = false;
//   ListCustomer: Customer[] = [];
// }



