import { Component, OnInit } from '@angular/core';
import { BaoCaoService } from 'src/app/API/GetAPI/BaoCao/bao-cao.service';
import { DoanhThu, Von } from 'src/app/data/modal/BaoCao';
import { HoaDonBaoCao, PhieuNhapBaoCao } from 'src/app/data/modal/HoaDonBaoCao';

@Component({
  selector: 'app-bao-cao',
  templateUrl: './bao-cao.component.html',
  styleUrls: ['./bao-cao.component.scss'],
  providers: [BaoCaoService,HoaDonBaoCao,DoanhThu,Von],
})
export class BaoCaoComponent implements OnInit {
  public multi = [
    {
      name: "Doanh thu",
      series:  [
        {
          name: 1,
          value: 0,
        },
        {
          name: 2,
          value: 0,
        },
        {
          name: 3,
          value: 0,
        },
        {
          name: 4,
          value: 0,
        },
        {
          name: 5,
          value: 0,
        },
        {
          name: 6,
          value: 0,
        },
        {
          name: 7,
          value: 0,
        },
        {
          name: 8,
          value: 0,
        },
        {
          name: 9,
          value: 0
        },
        {
          name: 10,
          value: 0,
        },
        {
          name: 11,
          value: 0
        },
        {
          name: 12,
          value: 0
        },
      ]
    },
    {
      name: "Vốn",
      series: [
        {
          name: 1,
          value: 0,
        },
        {
          name: 2,
          value: 0,
        },
        {
          name: 3,
          value: 0,
        },
        {
          name: 4,
          value: 0,
        },
        {
          name: 5,
          value: 0,
        },
        {
          name: 6,
          value: 0,
        },
        {
          name: 7,
          value: 0,
        },
        {
          name: 8,
          value: 0,
        },
        {
          name: 9,
          value: 0,
        },
        {
          name: 10,
          value: 0,
        },
        {
          name: 11,
          value: 0,
        },
        {
          name: 12,
          value: 0,
        },
      ]
    },
];
  // ListNam: any[] = []
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tháng';
  yAxisLabel: string = 'Doanh thu';
  timeline: boolean = true;
  trimXAxisTicks: boolean = true;
  trimYAxisTicks: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  NgayHienTai: Date = new Date();
  ListHoaDonBaoCao: HoaDonBaoCao[] = [];
  ListHoaDonNhapBaoCao: PhieuNhapBaoCao[] = [];
  ListHoaDonBaoCaoTK: HoaDonBaoCao[] = [];
  ListHoaDonNhapBaoCaoTK: PhieuNhapBaoCao[] = [];
  ListDoanhThu: DoanhThu[] = [];
  TongKM: Number = 0;
  TongNhap: Number = 0;
  TongKMTK: Number = 0;
  TongNhapTK: Number = 0;
  TongHetHan: Number = 0;
  TongHetHanTK: Number = 0;
  check1: any;
  checkTK: boolean = false;
  CheckYears: any = 2021;
  constructor(
    public BaoCaos: BaoCaoService,
    public BaoCao: HoaDonBaoCao,
    public doanhThu: DoanhThu,
    public von: Von,
  ) { 
    this.getDoanhThu();
    this.getVon();
    // this.getAll();
    // this.check1 = this.multi;
  }
  

  ngOnInit(): void {
  }

  click(){
    // this.getAll();
    this.getDoanhThu();
    this.getVon();
    this.check1 = this.multi;
    this.checkTK = true;
  }

  getAll(){
    this.multi.forEach(ele => {
      if(ele.name == 'Doanh thu'){
          ele.series.forEach(ele1 => {
          this.BaoCaos.getDoanhThu(ele1.name).subscribe(result => {
            this.doanhThu = result;
            ele1.value = Number(this.doanhThu.DoanhThu);
          });
        });
      }
      if(ele.name == 'Vốn'){
        ele.series.forEach(ele1 => {
          this.BaoCaos.getVon(ele1.name).subscribe(result => {
            this.von = result;
            ele1.value = Number(this.von.Von);
          });
        });
      }
    });
    console.log(this.multi);
    
  }

  // getDoanhThu(){ 
  //   this.multi[0].series.forEach(ele => {
  //     this.BaoCaos.getDoanhThu(ele.name).subscribe(result => {
  //       this.doanhThu = result;
  //       ele.value = Number(this.doanhThu.DoanhThu);
  //     });
  //   });    
  // }
  getDoanhThu(){ 
    this.multi[0].series.forEach(ele => {
      this.TongKMTK = 0;
      this.BaoCaos.getBaoCaoHoaDon(ele.name,this.CheckYears).subscribe(result => {
        this.TongKMTK = 0;
        this.ListHoaDonBaoCaoTK = result;
        this.ListHoaDonBaoCaoTK.forEach(element =>{
          if((element.GiaTri != null || element.GiaTri != '') && element.SL > 0){
            if(element.LoaiKM == '%'){
              this.TongKMTK = Number(this.TongKMTK) + (Number(element.DonGiaBan) - (Number(element.DonGiaBan)*Number(element.GiaTri)/100))*Number(element.SL);
            }
            if(element.LoaiKM == 'Tien'){
              this.TongKMTK = Number(this.TongKMTK) + (Number(element.DonGiaBan) - Number(element.GiaTri))*Number(element.SL);
            }
          }
          if(element.SL > 0 && (element.GiaTri == null || element.GiaTri.toString() == '')){
            this.TongKMTK = Number(this.TongKMTK) + Number(element.DonGiaBan)*Number(element.SL);
          }
        });
        ele.value = Number(this.TongKMTK);
      });
    });    
  }

  // getVon(){
  //   this.multi[1].series.forEach(ele => {
  //     this.BaoCaos.getVon(ele.name).subscribe(result => {
  //       this.von = result;
  //       ele.value = Number(this.von.Von);
  //     });
  //   });
  // }
  getVon(){
    const date = new Date();
    this.multi[1].series.forEach(ele => {
      this.BaoCaos.getBaoCaoHoaDonNhap(ele.name,this.CheckYears).subscribe(result => {
        this.TongNhapTK = 0;
        this.ListHoaDonNhapBaoCaoTK = result;     
        this.ListHoaDonNhapBaoCaoTK.forEach(element => {
          this.TongNhapTK = Number(this.TongNhapTK) + Number(element.DonGiaNhap)*Number(element.SL);
        });
        ele.value = Number(this.TongNhapTK);
      });
    });
  }

  getBaoCaoHoaDon(ev : any){
    this.NgayHienTai = new Date(ev);
    this.TongKM = 0;
    this.BaoCaos.getBaoCaoHoaDon(this.NgayHienTai.getMonth()+1,this.NgayHienTai.getFullYear()).subscribe(result => {
      this.ListHoaDonBaoCao = result;
      console.log(this.ListHoaDonBaoCao);
      this.ListHoaDonBaoCao.forEach(element =>{
        if((element.GiaTri != null || element.GiaTri != '') && element.SL > 0){
          if(element.LoaiKM == '%'){
            this.TongKM = Number(this.TongKM) + (Number(element.DonGiaBan) - (Number(element.DonGiaBan)*Number(element.GiaTri)/100))*Number(element.SL);
          }
          if(element.LoaiKM == 'Tien'){
            this.TongKM = Number(this.TongKM) + (Number(element.DonGiaBan) - Number(element.GiaTri))*Number(element.SL);
          }
        }
        if(element.SL > 0 && (element.GiaTri == null || element.GiaTri.toString() == '')){
          this.TongKM = Number(this.TongKM) + Number(element.DonGiaBan)*Number(element.SL);
        }
      });
      console.log(this.TongKM);
      
    });
  }

  getBaoCaoHoaDonNhap(ev : any){
    this.NgayHienTai = new Date(ev);
    const date = new Date();
    this.TongHetHan = 0;
    this.TongNhap = 0;
    this.BaoCaos.getBaoCaoHoaDonNhap(this.NgayHienTai.getMonth()+1,this.NgayHienTai.getFullYear()).subscribe(result => {
      this.ListHoaDonNhapBaoCao = result;     
      this.ListHoaDonNhapBaoCao.forEach(element => {
        this.TongNhap = Number(this.TongNhap) + Number(element.DonGiaNhap)*Number(element.SL);
        if(date < new Date(element.NSX) || date > new Date(element.HSD)){
          this.TongHetHan = Number(this.TongHetHan) + Number(element.DonGiaNhap)*Number(element.SLTon); 
        }
      });
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

