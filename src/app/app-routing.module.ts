import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AllBillComponent } from './Components/all-bill/all-bill.component';
import { AllCakeComponent } from './Components/all-cake/all-cake.component';
import { BaoCaoComponent } from './Components/bao-cao/bao-cao.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { DetailBillComponent } from './Components/detail/detail-bill/detail-bill.component';
import { DetailCustomerComponent } from './Components/detail/detail-customer/detail-customer.component';
import { DetailPhieuNhapComponent } from './Components/detail/detail-phieu-nhap/detail-phieu-nhap.component';
import { SuaPhieuNhapComponent } from './Components/detail/detail-phieu-nhap/sua-phieu-nhap/sua-phieu-nhap.component';
import { DetailSaleOffComponent } from './Components/detail/detail-sale-off/detail-sale-off.component';
import { DetailTypeProductComponent } from './Components/detail/detail-type-product/detail-type-product.component';
import { DetalProductComponent } from './Components/detail/detal-product/detal-product.component';
import { HeaderComponent } from './Components/header/header.component';
import { HoaDonNhapComponent } from './Components/hoa-don-nhap/hoa-don-nhap.component';
import { ThemHoaDonNhapComponent } from './Components/hoa-don-nhap/them-hoa-don-nhap/them-hoa-don-nhap.component';
import { LoaiSpComponent } from './Components/loai-sp/loai-sp.component';
import { MenuComponent } from './Components/menu/menu.component';
import { NhaCungCapComponent } from './Components/nha-cung-cap/nha-cung-cap.component';
import { KMHetHanComponent } from './Components/sale-off/km-het-han/km-het-han.component';
import { SaleOffComponent } from './Components/sale-off/sale-off.component';
import { LoginComponent } from './User/login/login.component';

const routes: Routes = [
  { 
    path: 'menu',
    component: MenuComponent,
    children: [
      {
        path: 'index',
        component: HeaderComponent,
        children: [
          { 
            path: 'all-cake',
            component: AllCakeComponent,
          },
          { 
            path: 'all-bill',
            component: AllBillComponent,
          },
          { 
            path: 'customers',
            component: CustomersComponent,
          },
          { 
            path: 'admin',
            component: AdminComponent,
          },
          { 
            path: 'type-cake',
            component: LoaiSpComponent,
          },
          { 
            path: 'sale-off',
            component: SaleOffComponent,
          },
          { 
            path: 'sale-off-done',
            component: KMHetHanComponent,
          },
          { 
            path: 'nha-cung-cap',
            component: NhaCungCapComponent,
          },
          { 
            path: 'hoa-don-nhap',
            component: HoaDonNhapComponent,
          },
          { 
            path: 'report',
            component: BaoCaoComponent,
          },

          { 
            path: 'all-cake/detail-cake',
            component: DetalProductComponent,
          },
          { 
            path: 'type-cake/detail-type-cake',
            component: DetailTypeProductComponent,
          },
          { 
            path: 'all-bill/detail-bill/detail-cake',
            component: DetalProductComponent,
          },
          { 
            path: 'all-bill/detail-bill',
            component: DetailBillComponent,
          },
          { 
            path: 'customer/detail-customer',
            component: DetailCustomerComponent,
          },
          { 
            path: 'customer/detail-customer/detail-bill',
            component: DetailBillComponent,
          },
          { 
            path: 'sale-off/detail-sale-off',
            component: DetailSaleOffComponent,
          },
          { 
            path: 'hoa-don-nhap/detail-hoa-don-nhap',
            component: DetailPhieuNhapComponent,
          },
          { 
            path: 'hoa-don-nhap/detail-hoa-don-nhap/sua-phieu-nhap',
            component: SuaPhieuNhapComponent,
          },
          { 
            path: 'hoa-don-nhap/them-hoa-don-nhap',
            component: ThemHoaDonNhapComponent,
          },
        ]
      }
    ]
  },
  { 
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
