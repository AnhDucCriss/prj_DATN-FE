import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-dstaikhoan',
  templateUrl: './dstaikhoan.component.html',
  styleUrls: ['./dstaikhoan.component.scss']
})
export class DstaikhoanComponent implements OnInit {
    constructor(private service:SharedService) {}
    
    DSTaiKhoan:any=[];
    ngOnInit(): void {
      console.log('DSTaiKhoanComponent mounted');
      this.taiLaiDSTaiKhoan(); 
      
    }
    taiLaiDSTaiKhoan() {
      this.service.layDSTaiKhoan().subscribe({
        next: (data) => {
          this.DSTaiKhoan = data;
        },
        error: (err) => {
          console.error('Lỗi tải danh sách tài khoản', err);
        }
      });
    }
    convertRole(role: number): string {
      switch (role) {
        case 0: return 'Admin';
        case 1: return 'Bác sĩ';
        case 2: return 'Y tá';
        case 3: return 'Kế toán';
        default: return 'Không xác định';
      }
    }

    deleteAccount(id: string): void {
      if (confirm('Bạn có chắc chắn muốn xoá tài khoản này không?')) {
        this.service.xoaTaiKhoan(id).subscribe({
          next: () => {
            alert('Xoá thành công!');
            this.taiLaiDSTaiKhoan(); // reload danh sách
          },
          error: (err) => {
            console.error('Xoá thất bại:', err);
            alert('Xoá thất bại!');
          }
        });
      }
    }
    //Sửa
    dangSua = false;
    taiKhoanDangSua: any = null;

    chonTaiKhoanDeSua(tk: any) {
      this.taiKhoanDangSua = tk;
      this.dangSua = true;
      console.log(this.taiKhoanDangSua);
    }
    
    dongModalSua() {
      this.dangSua = false;
    }
}
