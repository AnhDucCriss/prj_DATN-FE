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
    icon: 'bi bi-people', // Quản lý tài khoản => nhóm người dùng
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlybenhnhan',
    title: 'Quản lý bệnh nhân',
    icon: 'bi bi-hospital', // Biểu tượng bệnh viện => bệnh nhân
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlynhanvien',
    title: 'Quản lý nhân viên',
    icon: 'bi bi-person-badge', // Nhân viên => thẻ tên
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/quanlykhothuoc',
    title: 'Quản lý kho thuốc',
    icon: 'bi bi-capsule-pill', // Viên thuốc cụ thể hơn `bi-capsule`
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
