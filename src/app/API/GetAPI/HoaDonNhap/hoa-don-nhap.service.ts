import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CTPN } from 'src/app/data/modal/CTPN';
import { HoaDonNhap } from 'src/app/data/modal/HoaDonNhap';
import { HSD } from 'src/app/data/modal/HSD';
import { KichThuoc, KichThuocBanh } from 'src/app/data/modal/KichThuoc';
import { admin } from 'src/app/data/modal/login';
import { mabanhmax } from 'src/app/data/modal/MaBanhMax';
import { Product } from 'src/app/data/modal/product';

@Injectable({
  providedIn: 'root'
})
export class HoaDonNhapService {
  HeaderUrl = "http://localhost:3000";
  constructor(
    public http: HttpClient,
  ) { 
    
  }
  getAllHoaDonNhap(): Observable<HoaDonNhap[]>{
    const url = this.HeaderUrl+"/allHoaDonNhap";
    return this.http.get<HoaDonNhap[]>(url)
  }

  getDetailHoaDonNhap(MaPN: any): Observable<HoaDonNhap>{
    const url = this.HeaderUrl+"/detailHoaDonNhap?MaPN="+MaPN;
    return this.http.get<HoaDonNhap>(url)
  }

  getListHSD(MaPN: any):Observable<HSD[]>{
    const url = this.HeaderUrl+"/listCTHDN?MaPN=" + MaPN;
    return this.http.get<HSD[]>(url)
  }

  getMaBanhMax():Observable<mabanhmax>{
    const url = this.HeaderUrl+"/maBanhMax";
    return this.http.get<mabanhmax>(url)
  }

  getMaPNMax():Observable<mabanhmax>{
    const url = this.HeaderUrl+"/getMaPNMax";
    return this.http.get<mabanhmax>(url)
  }

  getMaKT_BanhMax():Observable<mabanhmax>{
    const url = this.HeaderUrl+"/getMaKTBanhMax";
    return this.http.get<mabanhmax>(url)
  }

  getListAD():Observable<admin[]>{
    const url = this.HeaderUrl+"/getListAD";
    return this.http.get<admin[]>(url)
  }

  themBanhMoi(MaBanh: any,TenBanh: any,MaLoaiBanh: any,AnhSP: any,HinhDang: any,MoTa: any,body: Product):Observable<Product>{
    const url = this.HeaderUrl+"/themBanh?MaBanh="+MaBanh+"&TenBanh="+TenBanh+"&MaLoaiBanh="+MaLoaiBanh+"&AnhSP="+AnhSP+"&HinhDang="+HinhDang+"&MoTa="+MoTa;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<Product>(url,body,http);
  }

  taoPhieuNhap(MaPN: any,MaAD: any,MaNCC: any,body: HoaDonNhap):Observable<HoaDonNhap>{
    const url = this.HeaderUrl+"/taoHoaDonNhap?MaPN="+MaPN+"&MaAD="+MaAD+"&MaNCC="+MaNCC;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<HoaDonNhap>(url,body,http);
  }

  ThemKichThuocBanh(MaKT_Banh: any,MaBanh: any,MaKT: any,DonGiaNhap: any,DonGiaBan: any,body: KichThuocBanh):Observable<KichThuocBanh>{
    const url = this.HeaderUrl+"/themKichThuocBanh?MaKT_Banh="+MaKT_Banh+"&MaBanh="+MaBanh+"&MaKT="+MaKT+"&DonGiaNhap="+DonGiaNhap+"&DonGiaBan="+DonGiaBan;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<KichThuocBanh>(url,body,http);
  }

  ThemCTPN(MaPN: any,MaKT_Banh: any,NSX: any,HSD: any,SL: any,GhiChu: any,body: CTPN):Observable<CTPN>{
    const url = this.HeaderUrl+"/themCTPhieuNhap?MaPN="+MaPN+"&MaKT_Banh="+MaKT_Banh+"&NSX="+NSX+"&HSD="+HSD+"&SL="+SL+"&GhiChu="+GhiChu;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.post<CTPN>(url,body,http);
  }

  getListKichThuoc():Observable<KichThuoc[]>{
    const url = this.HeaderUrl+"/getListkichThuoc";
    return this.http.get<KichThuoc[]>(url);
  }
}


export class Task {
  completed: boolean = false;
  ListHDN: HoaDonNhap[] = [];
}