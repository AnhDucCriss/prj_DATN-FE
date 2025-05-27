import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { QuanlytaikhoanComponent } from './quanlytaikhoan/quanlytaikhoan.component';
import { ThemsuataikhoanComponent } from './quanlytaikhoan/themsuataikhoan/themsuataikhoan.component';
import { DstaikhoanComponent } from './quanlytaikhoan/dstaikhoan/dstaikhoan.component';
import { SuataikhoanComponent } from './quanlytaikhoan/suataikhoan/suataikhoan.component';
import { DsbenhnhanComponent } from './quanlybenhnhan/dsbenhnhan/dsbenhnhan.component';
import { QuanlybenhnhanComponent } from './quanlybenhnhan/quanlybenhnhan.component';
import { ThembenhnhanComponent } from './quanlybenhnhan/thembenhnhan/thembenhnhan.component';
import { SuabenhnhanComponent } from './quanlybenhnhan/suabenhnhan/suabenhnhan.component';
import { QuanlynhanvienComponent } from './quanlynhanvien/quanlynhanvien.component';
import { DsnhanvienComponent } from './quanlynhanvien/dsnhanvien/dsnhanvien.component';
import { ThemnhanvienComponent } from './quanlynhanvien/themnhanvien/themnhanvien.component';
import { SuanhanvienComponent } from './quanlynhanvien/suanhanvien/suanhanvien.component';

import { QuanlykhothuocComponent } from './quanlykhothuoc/quanlykhothuoc.component';
import { ThemthuocComponent } from './quanlykhothuoc/themthuoc/themthuoc.component';
import { SuathuocComponent } from './quanlykhothuoc/suathuoc/suathuoc.component';
import { DsthuocComponent } from './quanlykhothuoc/dsthuoc/dsthuoc.component';
import { QuanlyhosokhambenhComponent } from './quanlyhosokhambenh/quanlyhosokhambenh.component';
import { ThemhskhambenhComponent } from './quanlyhosokhambenh/themhskhambenh/themhskhambenh.component';
import { SuahskhambenhComponent } from './quanlyhosokhambenh/suahskhambenh/suahskhambenh.component';
import { DshskhambenhComponent } from './quanlyhosokhambenh/dshskhambenh/dshskhambenh.component';
import { HoadonComponent } from './quanlyhosokhambenh/hoadon/hoadon.component';
import { DonthuocComponent } from './quanlyhosokhambenh/donthuoc/donthuoc.component';
import { SuaDonThuocComponent } from './quanlyhosokhambenh/donthuoc/suadonthuoc/suadonthuoc.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SuahoadonComponent } from './quanlyhosokhambenh/hoadon/suahoadon/suahoadon.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    RouterModule
  ],
  declarations: [


    QuanlytaikhoanComponent,
    ThemsuataikhoanComponent,
    DstaikhoanComponent,
    SuataikhoanComponent,

    QuanlybenhnhanComponent,
    DsbenhnhanComponent,
    ThembenhnhanComponent,
    SuabenhnhanComponent,
    
    QuanlynhanvienComponent,
    DsnhanvienComponent,
    ThemnhanvienComponent,
    SuanhanvienComponent,

    QuanlykhothuocComponent,
    ThemthuocComponent,
    SuathuocComponent,
    DsthuocComponent,

    QuanlyhosokhambenhComponent,
    SuahskhambenhComponent,
    ThemhskhambenhComponent,
    DshskhambenhComponent,

    HoadonComponent,
    DonthuocComponent,
    SuaDonThuocComponent,
    SuahoadonComponent,
    
  ],
  
})
export class ComponentsModule { }
