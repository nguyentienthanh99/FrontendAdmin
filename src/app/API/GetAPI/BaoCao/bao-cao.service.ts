import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoaDonBaoCao, PhieuNhapBaoCao } from 'src/app/data/modal/HoaDonBaoCao';
import { HoaDonNhap } from 'src/app/data/modal/HoaDonNhap';
import { DoanhThu, Von } from 'src/app/data/modal/BaoCao';

@Injectable({
  providedIn: 'root'
})
export class BaoCaoService {
  HeaderUrl = "http://localhost:3000";
  constructor(public http: HttpClient) { }
  getBaoCaoHoaDon(Thang: any,Nam: any): Observable<HoaDonBaoCao[]>{
    const url = this.HeaderUrl+"/tongGiaTriHoaDon?Thang="+Thang+"&Nam="+Nam;
    return this.http.get<HoaDonBaoCao[]>(url)
  }

  getBaoCaoHoaDonNhap(Thang: any,Nam: any): Observable<PhieuNhapBaoCao[]>{
    const url = this.HeaderUrl+"/tongGiaTriHoaDonNhap?Thang="+Thang+"&Nam="+Nam;
    return this.http.get<PhieuNhapBaoCao[]>(url)
  }

  getDoanhThu(Thang: any):Observable<DoanhThu>{
    const url = this.HeaderUrl+"/doanhThu?Thang="+Thang;
    return this.http.get<DoanhThu>(url)
  }

  getVon(Thang: any):Observable<Von>{
    const url = this.HeaderUrl+"/von?Thang="+Thang;
    return this.http.get<Von>(url)
  }
}
