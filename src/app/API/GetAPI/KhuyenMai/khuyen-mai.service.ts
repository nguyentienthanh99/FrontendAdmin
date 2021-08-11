import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saleOff } from 'src/app/data/modal/sale-offs';
import { Product } from 'src/app/data/modal/product';
import { KMBanh } from 'src/app/data/modal/KhuyenMaiBanh';
import { BanhChuaKM } from 'src/app/data/modal/BanhChuaKM';

@Injectable({
  providedIn: 'root'
})
export class KhuyenMaiService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getAllKhuyenMai(): Observable<saleOff[]>{
    const url = this.HeaderUrl+"/allKhuyenMai";
    return this.http.get<saleOff[]>(url)
  }

  getDetailKhuyenMai(MaKM: any): Observable<saleOff>{
    const url = this.HeaderUrl+"/detailKhuyenMai?MaKM="+MaKM;
    return this.http.get<saleOff>(url)
  }

  getBanhKM(MaKM: any):Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhKM?MaKM="+MaKM;
    return this.http.get<Product[]>(url)
  }

  getBanhChuaKM():Observable<BanhChuaKM[]>{
    const url = this.HeaderUrl+"/getBanhChuaKM";
    return this.http.get<BanhChuaKM[]>(url)
  }

  themBanhVaoKM(MaBanh:any,MaKM:any,body: KMBanh):Observable<KMBanh>{
    const url = this.HeaderUrl+"/themBanhVaoKM?MaBanh="+MaBanh+"&MaKM="+MaKM;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<KMBanh>(url,body,http);
  }

  themKM(TieuDe: any,AnhKM: any,GiaTri: any,LoaiKM: any,ThoiGianBatDau: any,ThoiGianKetThuc: any,MoTa: any,body: saleOff){
    const url = this.HeaderUrl+"/themKM?TieuDe="+TieuDe+"&AnhKM="+AnhKM+"&GiaTri="+GiaTri+"&LoaiKM="+LoaiKM+"&ThoiGianBatDau="+ThoiGianBatDau+"&ThoiGianKetThuc="+ThoiGianKetThuc+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<saleOff>(url,body,http);
  }

  suaKM(MaKM: any,TieuDe: any,GiaTri: any,LoaiKM: any,ThoiGianBatDau: any,ThoiGianKetThuc: any,MoTa: any,body: saleOff){
    const url = this.HeaderUrl+"/suaKM?MaKM="+MaKM+"&TieuDe="+TieuDe+"&GiaTri="+GiaTri+"&LoaiKM="+LoaiKM+"&ThoiGianBatDau="+ThoiGianBatDau+"&ThoiGianKetThuc="+ThoiGianKetThuc+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<saleOff>(url,body,http);
  }

  xoaKM(MaKM: any,body: saleOff){
    const url = this.HeaderUrl+"/xoaKM?MaKM="+MaKM;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<saleOff>(url,body,http);
  }
}

export class Task {
  completed: boolean = false;
  ListSaleOff: saleOff[] = [];
}