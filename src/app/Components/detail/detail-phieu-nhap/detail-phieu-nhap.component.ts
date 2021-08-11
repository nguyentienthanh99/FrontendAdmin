import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoaDonNhapService } from 'src/app/API/GetAPI/HoaDonNhap/hoa-don-nhap.service';
import { NhaCungCapService } from 'src/app/API/GetAPI/NhaCungCap/nha-cung-cap.service';
import { HoaDonNhap } from 'src/app/data/modal/HoaDonNhap';
import { HSD } from 'src/app/data/modal/HSD';
import { NhaCungCap } from 'src/app/data/modal/nhacungcap';

@Component({
  selector: 'app-detail-phieu-nhap',
  templateUrl: './detail-phieu-nhap.component.html',
  styleUrls: ['./detail-phieu-nhap.component.scss'],
  providers: [HoaDonNhapService,HoaDonNhap,NhaCungCapService,NhaCungCap],
})
export class DetailPhieuNhapComponent implements OnInit {
  id: any;
  idAD: any;
  listHSD: HSD[] = [];
  constructor(
    private roter: Router,
    private route: ActivatedRoute,
    public HDN: HoaDonNhapService,
    public item: HoaDonNhap,
    public NCC: NhaCungCapService,
    public itemNCC: NhaCungCap,
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.idAD = this.route.snapshot.queryParamMap.get('idAD');
    this.getDetailHDN();
    this.getListHSD();
   }

  ngOnInit(): void {
  }

  getDetailHDN(){
    this.HDN.getDetailHoaDonNhap(this.id).subscribe(result => {
      this.item= result;
      this.getDetailNCC();
    });

  }
  
  getDetailNCC(){
    this.NCC.getDetailNCC(this.item.MaNCC).subscribe(result => {
      this.itemNCC = result;
    });
  }

  getListHSD(){
    const now = new Date();
    this.HDN.getListHSD(this.id).subscribe(result => {
      this.listHSD = result;
      this.listHSD .forEach(element => {
        const a = element.HSD.toString();
        // console.log(typeof(Date.parse(element.HSD)));
        if(now > new Date(element.HSD) || now < new Date(element.NSX)){
          element.TinhTrang = "Hết hạn";
        }
        else element.TinhTrang = "";
      });
    });
  }

  goToSuaPhieuNhap(){
    this.roter.navigate(['/menu/index/hoa-don-nhap/detail-hoa-don-nhap/sua-phieu-nhap'],{queryParams :{id : this.id,idAD: this.idAD}});
  }
}
