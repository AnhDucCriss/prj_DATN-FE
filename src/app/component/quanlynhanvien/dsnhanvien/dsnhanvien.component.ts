import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-dsnhanvien',
  templateUrl: './dsnhanvien.component.html',
  styleUrls: ['./dsnhanvien.component.scss']
})
export class DsnhanvienComponent implements OnInit {

  constructor(private service:SharedService) {}
      
  DSNhanVien: any = {
    items: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: 10
  };
  ngOnInit(): void {
    this.loadStaff();  // Tải danh sách nhân viên ban đầu
  }
  convertGender(gender: number): string {
    switch (gender) {
      case 0: return 'Nam';
      case 1: return 'Nữ';
      default: return 'Không xác định';
    }
  }
  timKiemRong: any = null;
  taiLaiDSNhanVien() {
    this.service.getStaffByName(this.timKiemRong).subscribe({
      next: (data) => {
        this.DSNhanVien = data;
      },
      error: (err) => {
        console.error('Lỗi tải danh sách nhân viên', err);
      }
    });
  }
  deleteStaff(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xoá nhân viên này không?')) {
      this.service.xoaNhanVien(id).subscribe(res => {
        alert(res.message);
        this.taiLaiDSNhanVien(); // reload danh sách
      });
    }
  }
  //Sửa
  dangSua = false;
  nhanVienDangSua: any = null;

  chonNhanVienDeSua(nv: any) {
    this.nhanVienDangSua = nv;
    this.dangSua = true;
    console.log(this.nhanVienDangSua);
  }
  
  dongModalSua() {
    this.dangSua = false;
  }
  
  tuKhoaTimKiem: string = '';
  chucVuTimKiem: string = '';
  // Thuộc tính để lưu trữ thông tin phân trang
  totalRecords: number = 21;  // Tổng số bản ghi
  totalPages: number = 1;    // Tổng số trang
  pageNumber: number = 1;    // Số trang hiện tại
  pageSize: number = 10;     // Số bản ghi mỗi trang

  

  // Các thuộc tính khác như từ khóa tìm kiếm, vị trí nhân viên (chức vụ) nếu có
  pages: number[] = [];
  generatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  loadStaff(page: number = 1) {
    if (page >= 1 && page <= this.totalPages) {
    this.pageNumber = page;  // Cập nhật số trang hiện tại
  
    // Gọi API với số trang hiện tại và số bản ghi mỗi trang
    this.service.getStaff(this.pageNumber).subscribe({
      next: (data) => {
        this.DSNhanVien = data;  // Cập nhật danh sách nhân viên
        this.totalRecords = data.totalRecords;  // Cập nhật tổng số bản ghi
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);  // Tính tổng số trang
      },
      error: (err) => {
        console.error('Lỗi tải danh sách nhân viên', err);
      }
    });
  }
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / 10);
  }
  timKiemNhanVien(): void {
    const body = {
      name: this.tuKhoaTimKiem,
      position: this.chucVuTimKiem,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };
  
    this.service.getStaffByName(body).subscribe(res => {
      this.DSNhanVien = res;
      this.pageNumber = res.pageNumber;
      this.totalPages = Math.ceil(res.totalRecords / res.pageSize);
    });
  }
  
  

}
