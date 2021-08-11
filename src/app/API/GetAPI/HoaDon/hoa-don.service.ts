import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill, SoHoaDon } from 'src/app/data/modal/bills';
import { CTHD } from 'src/app/data/modal/CTHD';

@Injectable({
  providedIn: 'root'
})
export class HoaDonService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }

  getAllHoaDon(): Observable<Bill[]>{
    const url = this.HeaderUrl+"/listHoaDonXuat";
    return this.http.get<Bill[]>(url)
  }

  getDetailHoaDon(MaHD: any): Observable<Bill>{
    const url = this.HeaderUrl+"/detailHDXuat?MaHD="+MaHD;
    return this.http.get<Bill>(url)
  }

  getListCTHD(MaHD: any):Observable<CTHD[]>{
    const url = this.HeaderUrl+"/ListCTHD?MaHD="+MaHD;
    return this.http.get<CTHD[]>(url)
  }

  getSoHoaDon(MaKH: any):Observable<SoHoaDon>{
    const url = this.HeaderUrl+"/soHoaDonCuaKhachHang?MaKH="+MaKH;
    return this.http.get<SoHoaDon>(url)
  }

  xacThucDonHang(MaHD: any,body: Bill): Observable<Bill>{
    const url = this.HeaderUrl+"/xacThucDonHang?MaHD="+MaHD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Bill>(url,body,http);
  }

  xacThucGiaoHang(MaHD: any,body: Bill): Observable<Bill>{
    const url = this.HeaderUrl+"/xacThucGiaoHang?MaHD="+MaHD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Bill>(url,body,http);
  }

  xacThucThanhToan(MaHD: any,body: Bill): Observable<Bill>{
    const url = this.HeaderUrl+"/xacThucThanhToan?MaHD="+MaHD;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Bill>(url,body,http);
  }

  datCoc(MaHD: any,SoTienConLai: any,body: Bill): Observable<Bill>{
    const url = this.HeaderUrl+"/datCoc?MaHD="+MaHD+"&SoTienConLai="+SoTienConLai;
    const http = {headers : new HttpHeaders({contentType: 'application/json'})};
    return this.http.put<Bill>(url,body,http);
  }
}

export class Task {
  completed: boolean = false;
  ListBill: Bill[] = [];
}
