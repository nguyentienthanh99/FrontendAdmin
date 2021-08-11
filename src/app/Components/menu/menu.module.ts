import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
  ],

  bootstrap: [MenuComponent],
})
export class MenuModule { }
