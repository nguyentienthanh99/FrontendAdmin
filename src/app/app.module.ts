import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent, LogOutComponent } from './Components/header/header.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { AllCakeComponent, ThemBanhComponent } from './Components/all-cake/all-cake.component';
import { AllBillComponent } from './Components/all-bill/all-bill.component';
import { CustomersComponent } from './Components/customers/customers.component';
import { LoaiSpComponent, ThemLoaiBanhComponent } from './Components/loai-sp/loai-sp.component';
import { SaleOffComponent, ThemKMComponent } from './Components/sale-off/sale-off.component';
import { DetalProductComponent } from './Components/detail/detal-product/detal-product.component';
import { DatCocComponent, DetailBillComponent, DiaChiComponent } from './Components/detail/detail-bill/detail-bill.component';
import { DetailCustomerComponent } from './Components/detail/detail-customer/detail-customer.component';
import { DetailSaleOffComponent } from './Components/detail/detail-sale-off/detail-sale-off.component';
import { DetailTypeProductComponent } from './Components/detail/detail-type-product/detail-type-product.component';
// import {} from '@angular/material';

import { Substring } from 'src/app/data/Func/SubString.pipe';
import { LoaiKM } from './data/Func/CheckLoaiKM.pipe';
import { DonVi, SubDate } from './data/Func/DonVi.pipe';
import {  DeTailNCCComponent, NhaCungCapComponent, ThemNCCComponent } from './Components/nha-cung-cap/nha-cung-cap.component';
import { VietHoa } from './data/Func/VietHoa';
import { CheckBol, GiaoHang, ThanhToan, XacThuc } from './data/Func/CheckBol';
import { BaoCaoComponent } from './Components/bao-cao/bao-cao.component';
import { HoaDonNhapComponent } from './Components/hoa-don-nhap/hoa-don-nhap.component';
import { AnhNguoiDungDefault, checkSo } from './data/Func/checkAnh.pipe';
import { DetailPhieuNhapComponent } from './Components/detail/detail-phieu-nhap/detail-phieu-nhap.component';
import { ThemHoaDonNhapComponent } from './Components/hoa-don-nhap/them-hoa-don-nhap/them-hoa-don-nhap.component';
import { KMHetHanComponent } from './Components/sale-off/km-het-han/km-het-han.component';
import { LoginComponent } from './User/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SuaPhieuNhapComponent } from './Components/detail/detail-phieu-nhap/sua-phieu-nhap/sua-phieu-nhap.component';
import { AdminComponent, DetailAdminComponent, ThemAdminComponent } from './Components/admin/admin.component';
import { NgxPaginationModule } from 'ngx-pagination';

const pipe = [
  DonVi,
  Substring,
  LoaiKM,
  VietHoa,
  CheckBol,
  XacThuc,
  ThanhToan,
  GiaoHang,
  AnhNguoiDungDefault,
  checkSo,
  SubDate
]
const MatMD = [
  MatListModule,
  MatBadgeModule,
  A11yModule,
  ClipboardModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  ScrollingModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AllCakeComponent,
    AllBillComponent,
    CustomersComponent,
    LoaiSpComponent,
    SaleOffComponent,
    KMHetHanComponent,
    DetalProductComponent,
    DetailBillComponent,
    DetailCustomerComponent,
    DetailSaleOffComponent,
    DetailTypeProductComponent,
    pipe,
    NhaCungCapComponent,
    DeTailNCCComponent,
    ThemNCCComponent,
    ThemAdminComponent,
    DetailAdminComponent,
    BaoCaoComponent,
    ThemLoaiBanhComponent,
    ThemBanhComponent,
    DatCocComponent,
    HoaDonNhapComponent,
    DiaChiComponent,
    DetailPhieuNhapComponent,
    ThemKMComponent,
    ThemHoaDonNhapComponent,
    LoginComponent,
    LogOutComponent,
    SuaPhieuNhapComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMD,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // bootstrap: [LoginComponent],
  
})
export class AppModule { }
