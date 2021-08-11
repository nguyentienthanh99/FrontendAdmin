import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { admin } from 'src/app/data/modal/login';
import { LoginService } from 'src/app/API/GetAPI/Login/login.service';
import {FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService,admin]
})
export class AppComponent implements AfterViewInit {

  itemCheckPass: boolean = true;
  typeInput = "password";
  Empty = new FormControl('', [Validators.required]);
  mesErr: any;
  checkten: boolean = false;
  checkpass: boolean = false;
  checkLogin: boolean = true;
  constructor(
    private http: HttpClient,
    public admins: admin,
    public adminsCheck: admin,
    public logins: LoginService,
    private roter: Router,
    ){}

  ngAfterViewInit(): void {
    
  }
  title = 'Admin';

  getLogin(TenAD: any,MatKhau: any){
    this.logins.getLogin(TenAD,MatKhau).subscribe(result => {
      // this.admins = result;
      // console.log(this.admins);
      // console.log(result);
      if(result != null){
        this.admins = result;
        // this.admins.checkLogin = false;
        console.log(this.admins);
        this.logins.putCheckLogin(TenAD,this.adminsCheck).subscribe(resultCheck => {
          this.adminsCheck = resultCheck;
          this.roter.navigate(['all-cake'],{queryParams :{id : this.adminsCheck.MaAD}});
        });
      }
      if(result == null){window.alert("Bạn vui lòng nhập lại thông tin !!!");}
      
    });
    
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
  // click(){
    
  //   console.log(this.http.get("http://localhost:3000/listLoaiBanh"))
  // }
  // click(){
  //   // alert(window.screen.availWidth);
  //   // alert(window.screen.availHeight);
  //   var w = window,
  //   d = document,
  //   e = d.documentElement,
  //   g = d.getElementsByTagName('body')[0],
  //   x = w.innerWidth,
  //   x = e.clientWidth,
  //   x = g.clientWidth,
  //   y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  //   y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  //   y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  // alert(x + ' × ' + y);

  // }
}
