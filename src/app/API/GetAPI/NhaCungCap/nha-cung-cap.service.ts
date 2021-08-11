import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';

@Injectable({
  providedIn: 'root'
})
export class NhaCungCapService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getListNCC(): Observable<NhaCungCap[]>{
    const url = this.HeaderUrl+"/listNCC";
    return this.http.get<NhaCungCap[]>(url);
  }

  getDetailNCC(MaNCC: any): Observable<NhaCungCap>{
    const url = this.HeaderUrl+"/detailNCC?MaNCC="+MaNCC;
    return this.http.get<NhaCungCap>(url);
  }

  deleteNCC(MaNCC: any,body: NhaCungCap):Observable<NhaCungCap>{
    const url = this.HeaderUrl+"/XoaNCC?MaNCC=" + MaNCC;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<NhaCungCap>(url,body,http);
  }

  updateNCC(MaNCC: any,TenNCC:any,SDT:any,Email:any,DiaChi:any,Phuong:any,Quan:any,ThanhPho:any,body: NhaCungCap):Observable<NhaCungCap>{
    const url = this.HeaderUrl+"/suaNCC?MaNCC="+MaNCC+"&TenNCC="+TenNCC+"&SDT="+SDT+"&Email="+Email+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<NhaCungCap>(url,body,http);
  }

  themNCC(TenNCC:any,SDT:any,Email:any,DiaChi:any,Phuong:any,Quan:any,ThanhPho:any,body: NhaCungCap):Observable<NhaCungCap>{
    const url = this.HeaderUrl+"/themNCC?TenNCC="+TenNCC+"&SDT="+SDT+"&Email="+Email+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<NhaCungCap>(url,body,http);
  }
}

export class Task {
  completed: boolean = false;
  ListNhaCungCap: NhaCungCap[] = [];
}

