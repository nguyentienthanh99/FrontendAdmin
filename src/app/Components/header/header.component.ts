import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { admin } from 'src/app/data/modal/login';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/API/GetAPI/Login/login.service';

// import { TYPEPRODUCT } from 'src/app/data/sevice/type-product.sevice';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() item: any;
  @Input() itemName: string = '';
  @Input() itemAnh = '';
  // ListLoaiBanh = TYPEPRODUCT.map(item => item.TenLoai);
  // ListBanh = PRODUCT.map(item => item.TenBanh);
  myControlLoaiBanh = new FormControl(); 
  myControlBanh = new FormControl(); 
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptionsLoai: any;
  filteredOptionsBanh: any;
  public idAD: any;
  a: any[] = [];
  constructor(
    public admins: admin,
    public adminsLogout: admin,
    public dialog: MatDialog,
    public roter: Router,
    public routeAC: ActivatedRoute,
    public logins: LoginService,
  ) { 
    this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');
    this.getAD();
    
  }

  ngOnInit(): void {
      
  }

 
  getAD(){
    this.logins.getAD(this.idAD).subscribe(result => {
      this.admins = result;
    });
  }

  logOut(){
    const conf = window.confirm("Bạn có muốn đăng xuất không ?");
    if(conf){
      // this.roter.navigate(["main"]);
      this.roter.navigate(['']);
      // this.logins.putCheckLogout(this.itemName,this.adminsLogout).subscribe(result => {
      //   this.adminsLogout = result;
        
        
      // });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogOutComponent, {
      width: '500px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}



//-----------------

@Component({
  selector: 'log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./header.component.scss']
})
export class LogOutComponent implements OnInit {
  @Input() item: any;
  @Input() itemName: string = '';
  @Input() itemAnh = '';
  constructor(
    public admins: admin,
    public dialogRef: MatDialogRef<LogOutComponent>,
  ) { 

  }

  ngOnInit(): void {
      
  }
  
}