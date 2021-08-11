import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, Customer } from 'src/app/data/modal/customer';
import { Bill } from 'src/app/data/modal/bills';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService{
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) {
    
   }
  getKhachHang():Observable<Customer[]>{
    const url = this.HeaderUrl+"/khachhang";
    return this.http.get<Customer[]>(url)
  }
  getAdmin():Observable<Admin[]>{
    const url = this.HeaderUrl+"/getListAD";
    return this.http.get<Admin[]>(url)
  }
  getDetailKhachHang(MaKH: any):Observable<Customer>{
    const url = this.HeaderUrl+"/detailkhachhang?MaKH="+MaKH;
    return this.http.get<Customer>(url)
  }

  getSoHoaDonCuaKhachHang(MaKH: any):Observable<Customer>{
    const url = this.HeaderUrl+"/soHoaDonCuaKhachHang?MaKH="+MaKH;
    return this.http.get<Customer>(url)
  }

  getdanhSachHoaDonCuaKhachHang(MaKH: any):Observable<Bill[]>{
    const url = this.HeaderUrl+"/danhSachHoaDonCuaKhachHang?MaKH="+MaKH;
    return this.http.get<Bill[]>(url)
  }

  suaKhachHang(MaKH: any,MaTK: any,TenKH: any,NgaySinh: any,GioiTinh: any,SDT: any,Email: any,Anh: any,DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,MatKhau: any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/suaKhachHang?MaKH="+MaKH+"&MaTK="+MaTK+"&TenKH="+TenKH+"&NgaySinh="+NgaySinh+"&GioiTinh="+GioiTinh+"&SDT="+SDT+"&Email="+Email+"&Anh="+Anh+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho+"&MatKhau="+MatKhau;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Customer>(url,body,http);
  }

  suaDiaChiKhachHang(DiaChi: any,Phuong: any,Quan: any,ThanhPho: any,MaKH: any,body: Customer):Observable<Customer>{
    const url = this.HeaderUrl+"/suaDiaChiKhachHang?MaKH="+MaKH+"&DiaChi="+DiaChi+"&Phuong="+Phuong+"&Quan="+Quan+"&ThanhPho="+ThanhPho;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Customer>(url,body,http);
  }

  themAD(Anh:any,TenAD:any,MatKhau: any,body: Admin):Observable<Admin>{
    const url = this.HeaderUrl+"/themAdmin?Anh="+Anh+"&TenAD="+TenAD+"&MatKhau="+MatKhau;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<Admin>(url,body,http);
  }

  xoaAdmin(MaAD: any,body: Admin):Observable<Admin>{
    const url = this.HeaderUrl+"/xoaAdmin?MaAD="+MaAD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Admin>(url,body,http);
  }

}

export class Task {
  completed: boolean = false;
  ListCustomer: Customer[] = [];
}



