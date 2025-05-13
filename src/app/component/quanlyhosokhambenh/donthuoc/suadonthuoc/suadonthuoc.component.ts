import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-suadonthuockhambenh',
  templateUrl: './suadonthuoc.component.html'
})
export class SuaDonThuocComponent {
  @Input() danhSachThuoc: any[] = [];
  @Input() medicalRecordId!: string; // cần để gọi lại đơn
  @Output() dong = new EventEmitter<void>();
  @Output() taiLai = new EventEmitter<void>(); // thêm output để báo cha load lại

  constructor(private service: SharedService) {}

  themThuocMoi() {
    this.danhSachThuoc.push({
      medicine: { medicineName: '' },
      unit: '',
      quantity: 0
    });
  }

  xoaThuoc(index: number) {
    this.danhSachThuoc.splice(index, 1);
  }

  luuMotThuoc(thuoc: any) {
    const request = {
      id: thuoc.id, // cần ID để cập nhật
      quantity: thuoc.quantity,
      unit: thuoc.unit,
      medicineName: thuoc.medicine?.medicineName || thuoc.medicineName
    };

    this.service.capNhatThuocTrongDon(request).subscribe({
      next: () => {
        alert('Đã cập nhật thành công');
        this.taiLai.emit(); // báo cha load lại dữ liệu
      },
      error: (err) => {
        console.error(err);
        alert('Lỗi khi cập nhật thuốc');
      }
    });
  }
}
