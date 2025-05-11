import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { QuanlyhosokhambenhComponent } from './component/quanlyhosokhambenh/quanlyhosokhambenh.component';
import { DonthuocComponent } from './component/quanlyhosokhambenh/donthuoc/donthuoc.component';
import { HoadonComponent } from './component/quanlyhosokhambenh/hoadon/hoadon.component';



export const Approutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: 'hoso-khambenh/:id',
        component: QuanlyhosokhambenhComponent
      },
      {
        path: 'donthuoc/:id',
        component: DonthuocComponent
      },
      {
        path: 'hoadon/:id',
        component: HoadonComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  },
];
