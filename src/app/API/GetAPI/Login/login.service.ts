import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { admin } from 'src/app/data/modal/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getLogin(TenAD: any,MatKhau: any): Observable<admin>{
    const url = this.HeaderUrl+"/checkLogin?TenAD="+TenAD+"&MatKhau="+MatKhau;
    return this.http.get<admin>(url);
  }

  getAD(MaAD: any): Observable<admin>{
    const url = this.HeaderUrl+"/getAD?MaAD="+MaAD;
    return this.http.get<admin>(url);
  }

  getListAD(): Observable<admin[]>{
    const url = this.HeaderUrl+"/getListAD";
    return this.http.get<admin[]>(url);
  }
  putCheckLogin(TenAD: any,body: admin){
    const url = this.HeaderUrl+"/login?CheckLogin=0&TenAD="+TenAD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<admin>(url,body,http);
  }
  putCheckLogout(TenAD: any,body: admin){
    const url = this.HeaderUrl+"/login?CheckLogin=1&TenAD="+TenAD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<admin>(url,body,http);
  }
}
