import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-suadonthuockhambenh',
  templateUrl: './suadonthuoc.component.html'
})
export class SuaDonThuocComponent implements AfterViewInit {
  @Input() danhSachThuoc: any[] = [];
  @Input() medicalRecordId!: string;

  @Output() dong = new EventEmitter<void>();
  @Output() taiLai = new EventEmitter<void>();

  @ViewChild('modalRef') modalRef!: ElementRef;

  constructor(private service: SharedService) {}

  ngAfterViewInit() {
    // Tự động focus hoặc thực hiện logic khi modal hiển thị (nếu cần)
    // Có thể thêm logic nếu dùng Bootstrap modal JS (nếu cần)
  }

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
      id: thuoc.id,
      quantity: thuoc.quantity,
      unit: thuoc.unit,
      medicineName: thuoc.medicine?.medicineName || thuoc.medicineName
    };

    this.service.capNhatThuocTrongDon(request).subscribe({
      next: () => {
        alert('Đã cập nhật thành công');
        this.taiLai.emit();
      },
      error: (err) => {
        console.error(err);
        alert('Lỗi khi cập nhật thuốc');
      }
    });
  }

  close() {
    this.dong.emit(); // ẩn modal từ cha
  }
}
