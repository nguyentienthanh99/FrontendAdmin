import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/data/modal/product';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';
import { HSD } from 'src/app/data/modal/HSD';
import { XoaNCCOfCake } from 'src/app/data/modal/XoaNCCofCake';

@Injectable({
  providedIn: 'root'
})
export class BanhService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getBanh():Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanh";
    return this.http.get<Product[]>(url)
  }

  getBanhDaBan():Observable<Product[]>{
    const url = this.HeaderUrl+"/listBanhDaBan";
    return this.http.get<Product[]>(url)
  }

  getDetailBanh(MaBanh: any):Observable<Product>{
    const url = this.HeaderUrl+"/detailBanh?MaBanh=" + MaBanh;
    return this.http.get<Product>(url)
  }

  getDetailBanhDaBan(MaBanh: any):Observable<Product>{
    const url = this.HeaderUrl+"/detailBanhDaBan?MaBanh=" + MaBanh;
    return this.http.get<Product>(url)
  }

  getNCC(MaBanh: any):Observable<NhaCungCap[]>{
    const url = this.HeaderUrl+"/nccCuaBanh?MaBanh=" + MaBanh;
    return this.http.get<NhaCungCap[]>(url)
  }

  getHSD(MaBanh: any):Observable<HSD[]>{
    const url = this.HeaderUrl+"/listHSDCuaKichThuocBanh?MaBanh=" + MaBanh;
    return this.http.get<HSD[]>(url)
  }

  xoaHSD(MaKT_Banh: any,NSX: Date,HSD: Date,body: HSD):Observable<HSD>{
    const url = this.HeaderUrl+"/xoaHSDKichThuocBanhTheoMaBanh?MaKT_Banh="+MaKT_Banh+"&NSX="+NSX+"&HSD="+HSD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<HSD>(url,body,http);
  }

  deleteNCCCuaBanh(MaBanh: any,MaNCC: any,body: XoaNCCOfCake):Observable<XoaNCCOfCake>{
    const url = this.HeaderUrl+"/xoaNCCCuaBanh?MaBanh="+MaBanh+"&MaNCC=" + MaNCC;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<XoaNCCOfCake>(url,body,http);
  }

  xoaBanh(MaBanh: any,body: Product):Observable<Product>{
    const url = this.HeaderUrl+"/XoaBanh?MaBanh="+MaBanh;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Product>(url,body,http);
  }

  suaBanh(MaBanh: any,TenBanh:any,MaLoaiBanh: any,AnhSP: any,HinhDang:any,MoTa:any,body: Product):Observable<Product>{
    const url = this.HeaderUrl+"/suaBanh?MaBanh="+MaBanh+"&TenBanh="+TenBanh+"&MaLoaiBanh="+MaLoaiBanh+"&AnhSP="+AnhSP+"&HinhDang="+HinhDang+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Product>(url,body,http);
  }

  themBanh(TenBanh:any,MaLoaiBanh: any,AnhSP: any,HinhDang:any,MoTa:any,body: Product):Observable<Product>{
    const url = this.HeaderUrl+"/themBanh?TenBanh="+TenBanh+"&MaLoaiBanh="+MaLoaiBanh+"&AnhSP="+AnhSP+"&HinhDang="+HinhDang+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<Product>(url,body,http);
  }
}

export class Task {
  completed: boolean = false;
  ListCake: Product[] = [];
}

