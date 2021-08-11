import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/API/GetAPI/Login/login.service';
import { admin } from 'src/app/data/modal/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService,admin]
})
export class LoginComponent implements OnInit {
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
  ) { 
    // this.getListAdmin();
  }

  ngOnInit(): void {
  }

  // getListAdmin(){
  //   this.login.getListAD().subscribe(result => {
  //     this.listAD = result;
  //   });
  // }

  getLogin(TenAD: any,MatKhau: any){
    this.logins.getLogin(TenAD,MatKhau).subscribe(result => {
      // this.admins = result;
      // console.log(this.admins);
      // console.log(result);
      if(result != null){
        this.admins = result;
        // this.admins.checkLogin = false;
        // console.log(this.admins);
        // this.logins.putCheckLogin(TenAD,this.adminsCheck).subscribe(resultCheck => {
        //   this.adminsCheck = resultCheck;
          this.roter.navigate(['menu/index/all-cake'],{queryParams :{idAD : this.admins.MaAD}});
        // });
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

  goTo(){
    this.roter.navigate(["all-cake"]);
  }
}
