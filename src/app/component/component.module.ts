import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";
import { QuanlytaikhoanComponent } from './quanlytaikhoan/quanlytaikhoan.component';
import { ThemsuataikhoanComponent } from './quanlytaikhoan/themsuataikhoan/themsuataikhoan.component';
import { DstaikhoanComponent } from './quanlytaikhoan/dstaikhoan/dstaikhoan.component';
import { SuataikhoanComponent } from './quanlytaikhoan/suataikhoan/suataikhoan.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdAlertBasicComponent,
    NgbdpaginationBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    CardsComponent,
    TableComponent,
    RouterModule
  ],
  declarations: [
    QuanlytaikhoanComponent,
    ThemsuataikhoanComponent,
    DstaikhoanComponent,
    SuataikhoanComponent
  ],
  
})
export class ComponentsModule { }
