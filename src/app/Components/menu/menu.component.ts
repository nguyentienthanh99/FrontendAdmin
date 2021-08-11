import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public panelOpenState = false;
  public menu = [
    {
      icon: 'far fa-clipboard',
      text: 'Quản lý đơn hàng',
      iconmenu: 'fas fa-angle-down',
    },
    {
      icon: 'far fa-clipboard',
      text: 'Quản lý đơn hàng',
      iconmenu: 'fas fa-angle-down',
    },
    {
      icon: 'far fa-clipboard',
      text: 'Quản lý đơn hàng',
      iconmenu: 'fas fa-angle-down',
    },
    {
      icon: 'far fa-clipboard',
      text: 'Quản lý đơn hàng',
      iconmenu: 'fas fa-angle-down',
    },
  ];
  idAD: any;

  constructor(
    private router: Router,
    private routeAC: ActivatedRoute,
    ) { 
    this.idAD = this.routeAC.snapshot.queryParamMap.get('idAD');    
  }

  ngOnInit(): void {
  }

  goToAllCake(){
    this.router.navigate(['/menu/index/all-cake'],{queryParams :{idAD : this.idAD}});
  }

  goToTypeCake(){
    this.router.navigate(['/menu/index/type-cake'],{queryParams :{idAD : this.idAD}});
  }

  goToNCC(){
    this.router.navigate(['/menu/index/nha-cung-cap'],{queryParams :{idAD : this.idAD}});
  }

  goToHDN(){
    this.router.navigate(['/menu/index/hoa-don-nhap'],{queryParams :{idAD : this.idAD}});
  }

  goToHDX(){
    this.router.navigate(['/menu/index/all-bill'],{queryParams :{idAD : this.idAD}});
  }
  
  goToKH(){
    this.router.navigate(['/menu/index/customers'],{queryParams :{idAD : this.idAD}});
  }

  goToAdmin(){
    this.router.navigate(['/menu/index/admin'],{queryParams :{idAD : this.idAD}});
  }

  goToKM(){
    this.router.navigate(['/menu/index/sale-off'],{queryParams :{idAD : this.idAD}});
  }

  goToKMHH(){
    this.router.navigate(['/menu/index/sale-off-done'],{queryParams :{idAD : this.idAD}});
  }

  goToBC(){
    this.router.navigate(['/menu/index/report'],{queryParams :{idAD : this.idAD}});
  }
}
