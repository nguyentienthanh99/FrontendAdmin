import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeProduct } from 'src/app/data/modal/type-product';

@Injectable({
  providedIn: 'root'
})
export class LoaiBanhService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { 
    
  }
  getLoaiBanh(): Observable<TypeProduct[]>{
    const url = this.HeaderUrl+"/listLoaiBanh";
    return this.http.get<TypeProduct[]>(url);
  }

  getDetailLoaiBanh(MaLoaiBanh: any): Observable<TypeProduct>{
    const url = this.HeaderUrl+"/detailLoaiBanh?MaLoaiBanh="+MaLoaiBanh;
    return this.http.get<TypeProduct>(url);
  }

  getBanhOfType(MaLoaiBanh: any): Observable<any>{
    const url = this.HeaderUrl+"/listBanhCuaLoaiBanh?MaLoaiBanh="+MaLoaiBanh;
    return this.http.get<any>(url);
  }

  updateLoaiBanh(MaLoaiBanh: any,TenLoaiBanh:any,AnhLoai:any,MoTa:any,body: TypeProduct):Observable<TypeProduct>{
    const url = this.HeaderUrl+"/suaLoaiBanh?MaLoaiBanh="+MaLoaiBanh+"&TenLoaiBanh="+TenLoaiBanh+"&AnhLoai="+AnhLoai+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<TypeProduct>(url,body,http);
  }
  themLoaiBanh(TenLoaiBanh:any,AnhLoai:any,MoTa:any,body: TypeProduct):Observable<TypeProduct>{
    const url = this.HeaderUrl+"/themLoaiBanh?TenLoaiBanh="+TenLoaiBanh+"&AnhLoai="+AnhLoai+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<TypeProduct>(url,body,http);
  }

  xoaLoaiBanh(MaLoaiBanh: any,body: TypeProduct):Observable<TypeProduct>{
    const url = this.HeaderUrl+"/XoaLoaiBanh?MaLoaiBanh=" + MaLoaiBanh;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<TypeProduct>(url,body,http);
  }
}

export class Task {
  completed: boolean = false;
  ListLoaiBanh: TypeProduct[] = [];
}
