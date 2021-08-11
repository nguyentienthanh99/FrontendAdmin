import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaiBanhService} from 'src/app/API/GetAPI/LoaiBanh/loai-banh.service';
import { TypeProduct } from 'src/app/data/modal/type-product';

@Component({
  selector: 'app-detail-type-product',
  templateUrl: './detail-type-product.component.html',
  styleUrls: ['./detail-type-product.component.scss'],
  providers: [LoaiBanhService,TypeProduct],
})
export class DetailTypeProductComponent implements OnInit {
  id: any;
  images: any;
  CheckAnh: any;
  idAD: any;
  constructor( 
    private route: ActivatedRoute,
    private LoaiBanh: LoaiBanhService,
    public roter: Router, 
    public item: TypeProduct,
    public http: HttpClient,
    ) { 
      this.id = this.route.snapshot.queryParamMap.get('id');
      this.idAD = this.route.snapshot.queryParamMap.get('idAD');
      this.getDetailLoaiBanh();
      this.ckeckImage();
    }
  
  ngOnInit(): void {
    
  }

  getDetailLoaiBanh(){
    this.LoaiBanh.getDetailLoaiBanh(this.id).subscribe(result =>{
      this.item = result;
  });
  }


  ckeckImage(){
    if(this.item.AnhLoai == '' || this.item.AnhLoai  == null){
      this.item.AnhLoai = 'src/assets/cake/default.png';
    }
  }

  updateLoaiBanh(MaLoaiBanh: any,TenLoaiBanh:any,AnhLoai:any,MoTa:any){
    var conf = window.confirm('Bạn có chắc muốn sửa loại bánh '+MaLoaiBanh+' không ?');
    if(conf){
        const formData = new FormData();
        formData.append('fileAnhLoai', this.images);
        this.http.post<any>('http://localhost:3000/fileAnhLoai', formData).subscribe(
          (res) => console.log(res),
        );
        if(this.CheckAnh == undefined){
          this.CheckAnh = AnhLoai;
        }
      this.LoaiBanh.updateLoaiBanh(MaLoaiBanh,TenLoaiBanh,this.CheckAnh,MoTa,this.item).subscribe(result => {
        this.item = result;
        this.getDetailLoaiBanh();
      });
      
    }
  }

  XoaLoaiBanh(MaLoaiBanh: any){
    const conf = window.confirm("Bạn muốn xóa loại bánh "+this.id+" không ?");
    if(conf){
      this.LoaiBanh.xoaLoaiBanh(this.id,this.item).subscribe(result => {
        this.item = result;
      });
      this.roter.navigate(['menu/index/type-cake'],{queryParams :{idAD: this.idAD}});
    }
  }

  addImg(ev: any){
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      this.images = file;
      this.CheckAnh = "http://localhost:3000/AnhLoai/" + this.images.name;
    }    
  }
}
