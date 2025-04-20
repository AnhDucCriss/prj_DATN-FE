import { Routes } from '@angular/router';


import { QuanlytaikhoanComponent } from './quanlytaikhoan/quanlytaikhoan.component';
import { QuanlybenhnhanComponent } from './quanlybenhnhan/quanlybenhnhan.component';
import { QuanlynhanvienComponent } from './quanlynhanvien/quanlynhanvien.component';
import { QuanlydoanhthuComponent } from './quanlydoanhthu/quanlydoanhthu.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			
			{
				path: 'quanlytaikhoan',
				component: QuanlytaikhoanComponent,
			},
			{
				path: 'quanlybenhnhan',
				component: QuanlybenhnhanComponent,
			},
			{
				path: 'quanlynhanvien',
				component: QuanlynhanvienComponent,
			},
			{
				path: 'quanlydoanhthu',
				component: QuanlydoanhthuComponent,
			},
		
		]
	}
];
