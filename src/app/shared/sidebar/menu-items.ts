import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
//SUBMENUHere
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlytaikhoan',
    title: 'Quản lý tài khoản',
    icon: 'bi bi-person-circle',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlybenhnhan',
    title: 'Quản lý bệnh nhân',
    icon: 'bi bi-heart-pulse-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlynhanvien',
    title: 'Quản lý nhân viên',
    icon: 'bi bi-bag-plus-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
