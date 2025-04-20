import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-dsbenhnhan',
  templateUrl: './dsbenhnhan.component.html',
  styleUrls: ['./dsbenhnhan.component.scss']
})
export class DsbenhnhanComponent implements OnInit {
constructor(private service:SharedService) {}
    
    DSTaiKhoan:any=[];
    ngOnInit(): void {
      console.log('DSTaiKhoanComponent mounted');
      this.taiLaiDSBenhNhan(); 
      
    }
    taiLaiDSBenhNhan() {
      this.service.layDSbenhnhan().subscribe({
        next: (data) => {
          this.DSTaiKhoan = data;
        },
        error: (err) => {
          console.error('Lỗi tải danh sách bệnh nhân', err);
        }
      });
    }
    
    convertGender(role: number): any {
      switch (role) {
        case 0: return 'Nam';
        case 1: return 'Nữ';
        default: return 'Không xác định';
      }
    }

    deletePatient(id: string): void {
      if (confirm('Bạn có chắc chắn muốn xoá bệnh nhân này không?')) {
        this.service.xoaBenhNhan(id).subscribe({
          next: () => {
            alert('Xoá thành công!');
            this.taiLaiDSBenhNhan(); // reload danh sách
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
    benhNhanDangSua: any = null;

    chonTaiKhoanDeSua(tk: any) {
      this.benhNhanDangSua = tk;
      this.dangSua = true;
      console.log(this.benhNhanDangSua);
    }
    
    dongModalSua() {
      this.dangSua = false;
    }
}
