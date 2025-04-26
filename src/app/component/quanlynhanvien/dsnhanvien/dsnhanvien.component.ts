import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-dsnhanvien',
  templateUrl: './dsnhanvien.component.html',
  styleUrls: ['./dsnhanvien.component.scss']
})
export class DsnhanvienComponent implements OnInit {

  constructor(private service:SharedService) {}
      
  DSNhanVien:any=[];
  ngOnInit(): void {
    
    this.taiLaiDSNhanVien(); 
    
  }
  convertGender(gender: number): string {
    switch (gender) {
      case 0: return 'Nam';
      case 1: return 'Nữ';
      default: return 'Không xác định';
    }
  }
  taiLaiDSNhanVien() {
    this.service.layDSNhanVien().subscribe({
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

  //Tìm kiếm theo tên
  tuKhoaTimKiem: string = '';
  DSNhanVienLoc: any[] = []; // danh sách nhân viên sau khi lọc
  timKiemNhanVien(tuKhoaTimKiem: any){
    const keyword = this.tuKhoaTimKiem.trim();
    if (keyword.length === 0) {
      this.taiLaiDSNhanVien(); // Gọi lại tất cả nhân viên nếu từ khóa rỗng
      return;
    }
  
    
    this.service.getStaffByName(tuKhoaTimKiem).subscribe({
      next: (data) => {
        this.DSNhanVien = data;
      },
      error: (err) => {
        console.error('Lỗi khi tìm kiếm nhân viên:', err);
      }
    });
  } 

  //Tìm kiếm theo chức vụ
  chucVu: string = '';
  
  

}
